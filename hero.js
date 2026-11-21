/* ============================================================
   Hero de inicio: el resumen del mes recibe un comprobante nuevo
   que pasa de "Enviando" a "Autorizado" y suma uno al contador.
   - Sin movimiento reducido: estado final fijo, sin ciclos.
   - Se pausa fuera de pantalla o con la pestaña oculta.
   - Se detiene tras unos pocos ciclos para no distraer.
   ============================================================ */
(function () {
    'use strict';

    var hero = document.querySelector('.hero-lsoft');
    if (!hero) return;

    var latest = document.getElementById('lhLatest');
    var count = document.getElementById('lhCount');
    var docNum = document.getElementById('lhDocNum');
    var docClient = document.getElementById('lhDocClient');
    var docAmount = document.getElementById('lhDocAmount');
    var status = document.getElementById('lhStatus');
    if (!latest || !count || !docNum || !docClient || !docAmount || !status) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    var docs = [
        { client: 'Comercial Andina S.A.', amount: '$1.250,00' },
        { client: 'Agroexport Guayas', amount: '$3.912,40' },
        { client: 'Ferretería El Puerto', amount: '$684,75' },
        { client: 'Textiles Cuenca Cía. Ltda.', amount: '$1.875,20' }
    ];

    var SEND_MS = 2200;      // tiempo en "Enviando"
    var CYCLE_MS = 12000;    // un comprobante nuevo cada 12 s
    var FIRST_MS = 2600;     // primer evento tras la entrada
    var MAX_CYCLES = docs.length;

    var sequence = 4583;
    var total = 311;
    var cycles = 0;
    var timer = null;
    var busy = false;
    var visible = true;

    function pad(n) {
        var s = String(n);
        while (s.length < 9) s = '0' + s;
        return s;
    }

    function setSending(doc) {
        docNum.textContent = '001-002-' + pad(sequence);
        docClient.textContent = doc.client;
        docAmount.textContent = doc.amount;
        status.textContent = 'Enviando';
        status.className = 'lh-status is-sending';
        latest.classList.remove('is-entering');
        void latest.offsetWidth;
        latest.classList.add('is-entering');
    }

    function setAuthorized() {
        status.textContent = 'Autorizado';
        status.className = 'lh-status is-done';
        total += 1;
        count.textContent = String(total);
        count.classList.add('is-bump');
        setTimeout(function () { count.classList.remove('is-bump'); }, 1400);
    }

    function runCycle() {
        timer = null;
        if (!visible || document.hidden) return;
        if (cycles >= MAX_CYCLES) return;

        var doc = docs[cycles];
        cycles += 1;
        sequence += 1;
        busy = true;
        setSending(doc);

        setTimeout(function () {
            setAuthorized();
            busy = false;
            schedule(CYCLE_MS);
        }, SEND_MS);
    }

    function schedule(ms) {
        if (timer || busy || cycles >= MAX_CYCLES) return;
        timer = setTimeout(runCycle, ms);
    }

    // Estado inicial: el contador muestra 311 hasta que llega el primer comprobante.
    count.textContent = String(total);

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
            if (visible) schedule(FIRST_MS);
        }, { threshold: 0.3 }).observe(latest);
    } else {
        schedule(FIRST_MS);
    }

    document.addEventListener('visibilitychange', function () {
        if (!document.hidden && visible) schedule(FIRST_MS);
    });
})();
