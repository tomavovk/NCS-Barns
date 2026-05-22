(function () {
  const NAV_CSS = `
    /* ─────────────────────────────────────────
       BACKDROP
    ───────────────────────────────────────── */
    [data-comment="nav-backdrop"] {
        position: fixed;
        inset: 0;
        top: var(--nav-height);
        background: rgba(20, 18, 16, 0.18);
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        z-index: 998;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--t-med), visibility var(--t-med);
    }
    [data-comment="nav-backdrop"].is-open {
        opacity: 1;
        visibility: visible;
    }

    /* ─────────────────────────────────────────
       NAV ROOT
    ───────────────────────────────────────── */
    [data-comment="nav-root"] {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: #ffffff;
        border-bottom: 1px solid #EAE6E3;
        transition: box-shadow var(--t-med);
    }
    [data-comment="nav-root"].is-scrolled {
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.07);
    }

    .nav-inner {
        max-width: var(--max-width);
        margin: 0 auto;
        padding: 0 var(--page-px);
        height: var(--nav-height);
        display: flex;
        align-items: center;
    }

    /* ─────────────────────────────────────────
       LOGO
    ───────────────────────────────────────── */
    .nav-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        flex-shrink: 0;
        margin-right: 36px;
    }

    .nav-logo-img {
        height: 40px;
        width: auto;
        display: block;
        filter: invert(1);
    }

    .nav-logo-name {
        font-size: 17px;
        font-weight: 600;
        color: var(--color-dark);
        letter-spacing: -0.3px;
        white-space: nowrap;
    }

    /* ─────────────────────────────────────────
       MAIN LINK LIST
    ───────────────────────────────────────── */
    .nav-links {
        display: flex;
        align-items: center;
        list-style: none;
        gap: 2px;
        flex: 1;
    }

    .nav-item {
        position: static;
    }

    .nav-trigger {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 8px 13px;
        border: none;
        background: none;
        cursor: pointer;
        font-family: var(--font-ui);
        font-size: 14.5px;
        font-weight: 500;
        color: var(--color-dark);
        border-radius: 8px;
        transition: background var(--t-fast), color var(--t-fast);
        white-space: nowrap;
        text-decoration: none;
        line-height: 1;
    }

    .nav-trigger:hover,
    .nav-item.is-open > .nav-trigger {
        background: var(--color-bg-hover);
        color: var(--color-burgundy);
    }

    /* ─────────────────────────────────────────
       RIGHT CONTROLS
    ───────────────────────────────────────── */
    .nav-right {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-left: auto;
    }

    .nav-search {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--color-bg);
        border: 1.5px solid transparent;
        border-radius: 9px;
        padding: 7px 13px;
        transition: border-color var(--t-fast), background var(--t-fast);
        width: 260px;
    }
    .nav-search:focus-within {
        border-color: var(--color-burgundy);
        background: var(--color-bg);
    }

    .nav-search-icon {
        width: 15px;
        height: 15px;
        flex-shrink: 0;
        stroke: var(--color-gray);
        stroke-width: 2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: stroke var(--t-fast);
    }
    .nav-search:focus-within .nav-search-icon {
        stroke: var(--color-gray-light);
    }

    .nav-search-input {
        border: none;
        background: none;
        outline: none;
        font-family: var(--font-ui);
        font-size: 13.5px;
        color: var(--color-dark);
        width: 100%;
    }
    .nav-search-input::placeholder {
        color: var(--color-gray-light);
    }

    .nav-icon-btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 9px;
        color: var(--color-dark);
        text-decoration: none;
        transition: background var(--t-fast), color var(--t-fast);
    }
    .nav-icon-btn:hover {
        background: var(--color-bg-hover);
        color: var(--color-burgundy);
    }
    .nav-icon-btn i { font-size: 20px; line-height: 1; }
    .nav-icon-btn svg {
        width: 20px;
        height: 20px;
        stroke: currentColor;
        stroke-width: 1.8;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .nav-cart-badge {
        display: none;
        position: absolute;
        top: 7px;
        right: 7px;
        width: 7px;
        height: 7px;
        background: var(--color-burgundy);
        border-radius: 50%;
        border: 1.5px solid var(--color-bg);
    }

    /* ─────────────────────────────────────────
       MEGA MENU
    ───────────────────────────────────────── */
    .nav-mega {
        position: fixed;
        top: var(--nav-height);
        left: 0;
        right: 0;
        z-index: 999;
        background: var(--color-bg);
        border-bottom: 1px solid var(--color-border);
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.09), 0 2px 8px rgba(0, 0, 0, 0.04);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity var(--t-med), visibility var(--t-med);
    }
    .nav-item.is-open > .nav-mega {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
    }

    .nav-mega-inner {
        max-width: var(--max-width);
        margin: 0 auto;
        padding: 0 0 0 var(--page-px);
        display: flex;
        align-items: stretch;
        gap: 48px;
    }

    .nav-mega-body {
        flex: 1;
        padding: 28px 0 32px;
        min-width: 0;
    }

    .nav-mega-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        margin-bottom: 24px;
        border-bottom: 1px solid rgba(0,0,0,0.06);
    }

    .nav-mega-eyebrow {
        font-family: var(--font-ui);
        font-size: 18px;
        font-weight: 500;
        color: var(--color-dark);
        letter-spacing: -0.4px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .nav-mega-eyebrow-arrow {
        color: var(--color-burgundy);
        font-family: var(--font-ui);
        font-size: 20px;
        font-weight: 300;
        letter-spacing: -1px;
    }

    .nav-mega-cols {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 0 48px;
    }

    .nav-mega-col {
        padding: 0;
    }

    .nav-mega-col-title {
        font-size: 10.5px;
        font-weight: 500;
        letter-spacing: 0.9px;
        text-transform: uppercase;
        color: var(--color-gray-light);
        padding-left: 10px;
        margin-bottom: 12px;
    }

    .nav-mega-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .nav-mega-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 7px 10px;
        border-radius: 7px;
        font-size: 14px;
        font-weight: 500;
        color: var(--color-dark);
        text-decoration: none;
        transition: background var(--t-fast), color var(--t-fast);
        white-space: nowrap;
    }

    .nav-mega-link .ri-arrow-right-up-line {
        font-size: 14px;
        color: var(--color-gray-light);
        flex-shrink: 0;
        transition: color var(--t-fast);
    }

    .nav-mega-link:hover .ri-arrow-right-up-line {
        color: var(--color-burgundy);
    }
    .nav-mega-link:hover {
        background: var(--color-bg-hover);
        color: var(--color-burgundy);
    }

    /* ── CTA card ── */
    .nav-mega-cta {
        width: 232px;
        flex-shrink: 0;
        border-radius: 14px;
        overflow: hidden;
        position: relative;
        background-color: var(--color-dark);
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 20px;
        align-self: stretch;
        margin: 8px 8px 8px 0;
    }

    .nav-mega-cta::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top,
            rgba(10, 8, 8, 0.82) 0%,
            rgba(10, 8, 8, 0.30) 60%,
            transparent 100%
        );
        border-radius: inherit;
    }

    .nav-mega-cta-content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .nav-mega-cta-label {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: rgba(255,255,255,0.55);
    }

    .nav-mega-cta-heading {
        font-size: 16px;
        font-weight: 700;
        color: #fff;
        letter-spacing: -0.3px;
        line-height: 1.2;
    }

    .nav-mega-cta-note {
        font-size: 12px;
        color: rgba(255,255,255,0.55);
        line-height: 1.45;
    }

    .btn-cta-card {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        margin-top: 12px;
        background: #fff;
        color: var(--color-dark);
        padding: 10px 16px;
        border-radius: 8px;
        font-family: var(--font-ui);
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        border: none;
        cursor: pointer;
        width: fit-content;
        transition: opacity var(--t-fast), transform var(--t-fast);
        white-space: nowrap;
    }
    .btn-cta-card:hover {
        opacity: 0.9;
        transform: translateY(-1px);
    }
    .btn-cta-card svg {
        width: 14px;
        height: 14px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        flex-shrink: 0;
    }
    .btn-cta-card i {
        font-size: 15px;
        flex-shrink: 0;
        line-height: 1;
    }

    /* ── Light illustration CTA cards ── */
    .nav-mega-cta--light {
        background-color: #F4F1EE;
        background-image: none !important;
    }
    .nav-mega-cta--light::before { display: none; }
    .nav-mega-cta--light .nav-mega-cta-label { color: var(--color-gray); }
    .nav-mega-cta--light .nav-mega-cta-heading { color: var(--color-dark); }
    .nav-mega-cta--light .nav-mega-cta-note { color: var(--color-gray); }
    .nav-mega-cta--light .btn-cta-card {
        background: var(--color-burgundy);
        color: #fff;
    }
    .nav-mega-cta-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: hidden;
        border-radius: inherit;
        opacity: 0.72;
    }
    .nav-mega-cta-bg svg {
        width: 100%;
        height: auto;
        display: block;
    }

    /* ─────────────────────────────────────────
       MEGA MENU COLUMN VARIANTS
    ───────────────────────────────────────── */
    .nav-mega-cols--about {
        grid-template-columns: 1fr 1fr 1fr;
    }

    .nav-mega-cols--buying {
        grid-template-columns: 1fr 1fr;
    }

    .nav-mega-col-subtitle {
        font-size: 10.5px;
        font-weight: 700;
        letter-spacing: 0.9px;
        text-transform: uppercase;
        color: var(--color-gray-light);
        padding-left: 10px;
        margin-top: 18px;
        margin-bottom: 8px;
    }

    .nav-mega-link--sub {
        padding-left: 12px;
        font-size: 13.5px;
        color: var(--color-gray);
    }
    .nav-mega-link--sub:hover {
        background: var(--color-bg-hover);
        color: var(--color-burgundy);
    }

    .nav-mega-col-divider {
        height: 1px;
        background: var(--color-border);
        margin: 12px 10px;
    }

    /* ─────────────────────────────────────────
       BUTTONS (nav-specific)
    ───────────────────────────────────────── */
    .btn-primary,
    .btn-outline,
    .btn-outline-white {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 22px;
        border-radius: 10px;
        font-family: var(--font-ui);
        font-size: 14px;
        font-weight: 600;
        letter-spacing: -0.1px;
        text-decoration: none;
        cursor: pointer;
        white-space: nowrap;
    }
    .btn-primary {
        background: var(--color-burgundy);
        color: #fff;
        border: none;
        transition: background var(--t-fast), transform var(--t-fast);
    }
    .btn-primary:hover { background: var(--color-burgundy-dark); transform: translateY(-1px); }
    .nav-customize-btn { padding: 8px 14px !important; font-size: 13px !important; border-radius: 8px !important; min-height: unset !important; width: auto !important; justify-content: unset !important; }
    .btn-outline {
        background: transparent;
        color: var(--color-dark);
        border: 1.5px solid var(--color-border);
        transition: border-color var(--t-fast), background var(--t-fast);
    }
    .btn-outline:hover { border-color: var(--color-dark); background: var(--color-bg-hover); }
    .btn-outline-white {
        background: rgba(255,255,255,0.1);
        color: #fff;
        border: 1.5px solid rgba(255,255,255,0.35);
        backdrop-filter: blur(8px);
        transition: border-color var(--t-fast), background var(--t-fast);
    }
    .btn-outline-white:hover { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.18); }

    /* ─────────────────────────────────────────
       SEARCH DROPDOWN  (prefix: .sd-)
    ───────────────────────────────────────── */
    .nav-search-wrap {
        position: relative;
        z-index: 1001;
    }

    .sd-dropdown {
        position: absolute;
        top: calc(100% + 12px);
        right: 0;
        width: 260px;
        background: #fff;
        border: 1px solid var(--color-border);
        border-radius: 10px;
        box-shadow: 0 16px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.05);
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-6px);
        transition: opacity var(--t-med), visibility var(--t-med), transform var(--t-med);
    }
    .sd-dropdown.is-open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .sd-input-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px;
        border-bottom: 1px solid var(--color-border);
    }
    .sd-input-icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        stroke: var(--color-gray);
        stroke-width: 2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
    .sd-input {
        flex: 1;
        border: none;
        outline: none;
        font-family: var(--font-ui);
        font-size: 14px;
        color: var(--color-dark);
        background: none;
    }
    .sd-input::placeholder { color: var(--color-gray-light); }
    .sd-clear-btn {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--color-border);
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        color: var(--color-gray);
        font-size: 13px;
        transition: background var(--t-fast);
        flex-shrink: 0;
    }
    .sd-clear-btn:hover { background: #ddd; }
    .sd-clear-btn.visible { display: flex; }

    .sd-body { padding: 16px 0 0; }
    .sd-section-label {
        font-size: 11.5px;
        font-weight: 600;
        color: var(--color-dark);
        letter-spacing: 0.3px;
        padding: 0 16px 10px;
    }
    .sd-history-list {
        list-style: none;
        display: flex;
        flex-direction: column;
    }
    .sd-history-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 9px 16px;
        cursor: pointer;
        transition: background var(--t-fast);
        text-decoration: none;
    }
    .sd-history-item:hover { background: var(--color-bg-hover); }
    .sd-history-item-text {
        font-size: 13.5px;
        color: var(--color-gray);
    }
    .sd-history-arrow {
        width: 14px;
        height: 14px;
        stroke: var(--color-gray-light);
        stroke-width: 2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        flex-shrink: 0;
    }

    .sd-results-list {
        list-style: none;
        display: flex;
        flex-direction: column;
    }
    .sd-result-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 16px;
        cursor: pointer;
        transition: background var(--t-fast);
        text-decoration: none;
        border-bottom: 1px solid var(--color-border);
    }
    .sd-result-item:last-child { border-bottom: none; }
    .sd-result-item:hover { background: var(--color-bg-hover); }
    .sd-result-thumb {
        width: 52px;
        height: 52px;
        border-radius: 9px;
        background: var(--color-bg-hover);
        border: 1px solid var(--color-border);
        flex-shrink: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .sd-result-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    .sd-result-thumb-placeholder {
        font-size: 20px;
        line-height: 1;
    }
    .sd-result-info { flex: 1; min-width: 0; }
    .sd-result-name {
        font-size: 13.5px;
        font-weight: 500;
        color: var(--color-dark);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 3px;
    }
    .sd-result-cat {
        font-size: 11px;
        color: var(--color-gray-light);
    }
    .sd-result-prices {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
        flex-shrink: 0;
    }
    .sd-result-price {
        font-size: 13.5px;
        font-weight: 600;
        color: var(--color-dark);
        white-space: nowrap;
    }
    .sd-result-price-old {
        font-size: 12px;
        color: var(--color-gray-light);
        text-decoration: line-through;
        white-space: nowrap;
    }
    .sd-result-price.is-sale { color: var(--color-burgundy); }

    .sd-footer {
        border-top: 1px solid var(--color-border);
        padding: 10px 12px;
    }
    .sd-show-all {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 12px 0;
        background: var(--color-dark);
        color: #fff;
        border: none;
        border-radius: 10px;
        font-family: var(--font-ui);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: background var(--t-fast);
    }
    .sd-show-all:hover { background: var(--color-burgundy); }
    .sd-show-all svg {
        width: 15px;
        height: 15px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        flex-shrink: 0;
    }

    .sd-empty {
        padding: 32px 16px;
        text-align: center;
    }
    .sd-empty-text {
        font-size: 13.5px;
        color: var(--color-gray);
    }
    .sd-empty-text strong { color: var(--color-dark); }

    /* ─────────────────────────────────────────
       HAMBURGER + MOBILE NAV
    ───────────────────────────────────────── */
    .nav-hamburger { display: none; align-items: center; justify-content: center; width: 40px; height: 40px; border: none; background: transparent; cursor: pointer; border-radius: 9px; color: var(--color-dark); font-size: 22px; transition: background var(--t-fast), color var(--t-fast); flex-shrink: 0; }
    .nav-hamburger:hover { background: var(--color-bg-hover); color: var(--color-burgundy); }
    .mobile-nav-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 1500; opacity: 0; visibility: hidden; transition: opacity var(--t-med), visibility var(--t-med); }
    .mobile-nav-overlay.is-open { opacity: 1; visibility: visible; }
    .mobile-nav { position: fixed; top: 0; right: 0; width: 300px; height: 100%; background: #ffffff; z-index: 1600; transform: translateX(100%); transition: transform 0.3s ease; padding: 24px; display: flex; flex-direction: column; box-shadow: -4px 0 32px rgba(0,0,0,0.12); overflow-y: auto; }
    .mobile-nav.is-open { transform: translateX(0); }
    .mobile-nav-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-shrink: 0; }
    .mobile-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
    .mobile-nav-logo-img { height: 32px; width: auto; }
    .mobile-nav-logo-name { font-size: 16px; font-weight: 600; color: var(--color-dark); letter-spacing: -0.3px; }
    .mobile-nav-close { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border: none; background: none; cursor: pointer; border-radius: 8px; color: var(--color-dark); font-size: 20px; transition: background var(--t-fast), color var(--t-fast); flex-shrink: 0; }
    .mobile-nav-close:hover { background: var(--color-bg-hover); color: var(--color-burgundy); }
    .mobile-nav-links { list-style: none; flex: 1; }
    .mobile-nav-links li { border-bottom: 1px solid var(--color-border); }
    .mobile-nav-links a { display: block; font-size: 16px; font-weight: 500; padding: 14px 0; color: var(--color-dark); text-decoration: none; transition: color var(--t-fast); }
    .mobile-nav-links a:hover { color: var(--color-burgundy); }
    .mobile-nav-divider { border: none; border-top: 1px solid var(--color-border); margin: 24px 0; flex-shrink: 0; }
    .mobile-nav-cta { display: block; text-align: center; margin-bottom: 20px; flex-shrink: 0; }
    .mobile-nav-actions { display: flex; gap: 10px; flex-shrink: 0; }

    /* ─────────────────────────────────────────
       RESPONSIVE
    ───────────────────────────────────────── */
    @media (max-width: 1024px) {
        .nav-search { display: none; }
        .nav-mega { display: none; }
        .nav-links { display: none; }
        .nav-hamburger { display: flex; }
        .nav-customize-btn { display: none; }
    }
  `;

  const NAV_HTML = `
        <!-- ── BACKDROP ── -->
        <div data-comment="nav-backdrop" id="navBackdrop"></div>

        <!-- ════════════════════════════════
             HEADER / NAV
        ════════════════════════════════ -->
        <header data-comment="nav-root" id="navRoot">
            <div class="nav-inner" data-comment="nav-inner">

                <!-- Logo -->
                <a href="index.html" class="nav-logo" data-comment="nav-logo">
                    <img
                        src="assets/Logo.png"
                        alt="NCS Barns"
                        class="nav-logo-img"
                        data-comment="nav-logo-img" />
                    <span class="nav-logo-name" data-comment="nav-logo-name">NCS Barns</span>
                </a>

                <!-- ── Main links ── -->
                <ul class="nav-links" data-comment="nav-links">

                    <!-- PRODUCTS -->
                    <li class="nav-item" id="navProducts" data-comment="nav-item-products">
                        <button class="nav-trigger" data-comment="nav-trigger-products">
                            Products
                        </button>

                        <!-- Mega menu -->
                        <div class="nav-mega" data-comment="nav-mega-products">
                            <div class="nav-mega-inner" data-comment="nav-mega-products-inner">

                                <div class="nav-mega-body" data-comment="nav-mega-products-body">
                                <div class="nav-mega-header" data-comment="nav-mega-header">
                                    <span class="nav-mega-eyebrow" data-comment="nav-mega-eyebrow">
                                        Explore NCS Barns
                                    </span>
                                </div>

                                <div class="nav-mega-cols" data-comment="nav-mega-cols">

                                    <!-- Structures -->
                                    <div class="nav-mega-col" data-comment="nav-mega-col-structures">
                                        <p class="nav-mega-col-title" data-comment="nav-mega-col-title-structures">Structures</p>
                                        <ul class="nav-mega-list" data-comment="nav-mega-list-structures">
                                            <li data-comment="nav-mega-li-sheds">
                                                <a href="catalog.html?category=Sheds" class="nav-mega-link" data-comment="nav-mega-link-sheds">Sheds</a>
                                            </li>
                                            <li data-comment="nav-mega-li-gazebos">
                                                <a href="catalog.html?category=Gazebos" class="nav-mega-link" data-comment="nav-mega-link-gazebos">Gazebos / Pergolas / Pavilions</a>
                                            </li>
                                            <li data-comment="nav-mega-li-hunting">
                                                <a href="catalog.html?category=Hunting+Blinds" class="nav-mega-link" data-comment="nav-mega-link-hunting">Hunting Blinds</a>
                                            </li>
                                            <li data-comment="nav-mega-li-play">
                                                <a href="catalog.html?category=Play+Structures" class="nav-mega-link" data-comment="nav-mega-link-play">Play Structures</a>
                                            </li>
                                            <li data-comment="nav-mega-li-animal">
                                                <a href="catalog.html?category=Animal+Structures" class="nav-mega-link" data-comment="nav-mega-link-animal">Animal Structures</a>
                                            </li>
                                            <li data-comment="nav-mega-li-rentals">
                                                <a href="catalog.html?category=Returned+Rentals" class="nav-mega-link" data-comment="nav-mega-link-rentals">Returned Rentals</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- Furniture -->
                                    <div class="nav-mega-col" data-comment="nav-mega-col-furniture">
                                        <p class="nav-mega-col-title" data-comment="nav-mega-col-title-furniture">Furniture</p>
                                        <ul class="nav-mega-list" data-comment="nav-mega-list-furniture">
                                            <li data-comment="nav-mega-li-indoor">
                                                <a href="catalog.html?category=Indoor+Furniture" class="nav-mega-link" data-comment="nav-mega-link-indoor">Indoor Furniture</a>
                                            </li>
                                            <li data-comment="nav-mega-li-outdoor">
                                                <a href="catalog.html?category=Outdoor+Furniture" class="nav-mega-link" data-comment="nav-mega-link-outdoor">Outdoor Furniture</a>
                                            </li>
                                            <li data-comment="nav-mega-li-decor">
                                                <a href="catalog.html?category=Decor" class="nav-mega-link" data-comment="nav-mega-link-decor">Decor &amp; More</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- Homes & Garages -->
                                    <div class="nav-mega-col" data-comment="nav-mega-col-homes">
                                        <p class="nav-mega-col-title" data-comment="nav-mega-col-title-homes">Homes &amp; Garages</p>
                                        <ul class="nav-mega-list" data-comment="nav-mega-list-homes">
                                            <li data-comment="nav-mega-li-custom-homes">
                                                <a href="catalog.html?category=Custom+Homes" class="nav-mega-link" data-comment="nav-mega-link-custom-homes">Custom Built Homes</a>
                                            </li>
                                            <li data-comment="nav-mega-li-modular-homes">
                                                <a href="catalog.html?category=Log+Homes" class="nav-mega-link" data-comment="nav-mega-link-modular-homes">Modular Log Homes</a>
                                            </li>
                                            <li data-comment="nav-mega-li-garages">
                                                <a href="catalog.html?category=Garages" class="nav-mega-link" data-comment="nav-mega-link-garages">Garages</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- Options -->
                                    <div class="nav-mega-col" data-comment="nav-mega-col-options">
                                        <p class="nav-mega-col-title" data-comment="nav-mega-col-title-options">Options</p>
                                        <ul class="nav-mega-list" data-comment="nav-mega-list-options">
                                            <li data-comment="nav-mega-li-colors">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-colors">Colors</a>
                                            </li>
                                            <li data-comment="nav-mega-li-log-cabin">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-log-cabin">Log Cabin Options</a>
                                            </li>
                                            <li data-comment="nav-mega-li-shed-options">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-shed-options">Additional Shed Options</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div><!-- /nav-mega-cols -->
                                </div><!-- /nav-mega-body -->

                                    <!-- CTA -->
                                    <div class="nav-mega-cta nav-mega-cta--light" data-comment="nav-mega-cta">
                                        <div class="nav-mega-cta-bg" data-comment="nav-mega-cta-bg">
                                            <svg viewBox="0 0 232 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <linearGradient id="fp3" x1="0" y1="0" x2="0" y2="1"><stop offset="0.36" stop-color="#F4F1EE" stop-opacity="0"/><stop offset="0.74" stop-color="#F4F1EE"/></linearGradient>
                                                </defs>
                                                <rect width="232" height="175" fill="#F4F1EE"/>
                                                <rect x="16" y="15" width="202" height="156" rx="12" fill="#1C1F24" fill-opacity="0.045"/>
                                                <rect x="14" y="12" width="202" height="156" rx="12" fill="white" stroke="#E8E4DF" stroke-width="1"/>
                                                <text x="26" y="32" font-family="Inter,sans-serif" font-size="12" font-weight="600" fill="#1C1F24">Style</text>
                                                <circle cx="203" cy="30" r="9" fill="#F4F1EE" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <line x1="199.5" y1="26.5" x2="206.5" y2="33.5" stroke="#9EA4AD" stroke-width="1.25" stroke-linecap="round"/>
                                                <line x1="206.5" y1="26.5" x2="199.5" y2="33.5" stroke="#9EA4AD" stroke-width="1.25" stroke-linecap="round"/>
                                                <line x1="14" y1="44" x2="216" y2="44" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <rect x="22" y="51" width="40" height="46" rx="5" fill="#FBF3F4" stroke="#8B1A2A" stroke-width="1.5"/>
                                                <polygon points="22,77 42,62 62,77" fill="#E4D5D7" stroke="#CCB0B5" stroke-width="0.75"/>
                                                <rect x="30" y="76" width="24" height="15" fill="#EDE3E5" stroke="#CCB0B5" stroke-width="0.75"/>
                                                <rect x="38" y="82" width="8" height="9" rx="1" fill="#8B1A2A" fill-opacity="0.45"/>
                                                <circle cx="58" cy="57" r="7.5" fill="#8B1A2A"/>
                                                <polyline points="54,57 57,60.5 63,52.5" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                <rect x="70" y="51" width="40" height="46" rx="5" fill="#F8F7F5" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <polygon points="70,77 90,60 110,77" fill="#E6E3DF" stroke="#D0CDC8" stroke-width="0.75"/>
                                                <rect x="78" y="76" width="24" height="15" fill="#ECEAE6" stroke="#D0CDC8" stroke-width="0.75"/>
                                                <rect x="86" y="82" width="8" height="9" rx="1" fill="#C8C4BE"/>
                                                <rect x="118" y="51" width="40" height="46" rx="5" fill="#F8F7F5" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <polygon points="118,77 138,68 158,77" fill="#E6E3DF" stroke="#D0CDC8" stroke-width="0.75"/>
                                                <rect x="126" y="76" width="24" height="15" fill="#ECEAE6" stroke="#D0CDC8" stroke-width="0.75"/>
                                                <rect x="129" y="79" width="7" height="12" rx="1" fill="#D0CDC8" stroke="#C4C0BA" stroke-width="0.5"/>
                                                <rect x="139" y="79" width="7" height="12" rx="1" fill="#D0CDC8" stroke="#C4C0BA" stroke-width="0.5"/>
                                                <rect x="166" y="51" width="40" height="46" rx="5" fill="#F8F7F5" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <polygon points="166,77 186,60 206,77" fill="#E6E3DF" stroke="#D0CDC8" stroke-width="0.75"/>
                                                <rect x="174" y="70" width="24" height="21" fill="#ECEAE6" stroke="#D0CDC8" stroke-width="0.75"/>
                                                <rect x="182" y="77" width="8" height="14" rx="1" fill="#C8C4BE"/>
                                                <line x1="14" y1="104" x2="216" y2="104" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <text x="26" y="121" font-family="Inter,sans-serif" font-size="11" font-weight="500" fill="#1C1F24">Size</text>
                                                <text x="150" y="121" font-family="Inter,sans-serif" font-size="11" fill="#9EA4AD">10' \xd7 16'</text>
                                                <circle cx="204" cy="118" r="8.5" fill="none" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <line x1="200" y1="118" x2="208" y2="118" stroke="#9EA4AD" stroke-width="1.25" stroke-linecap="round"/>
                                                <line x1="204" y1="114" x2="204" y2="122" stroke="#9EA4AD" stroke-width="1.25" stroke-linecap="round"/>
                                                <line x1="14" y1="132" x2="216" y2="132" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <text x="26" y="148" font-family="Inter,sans-serif" font-size="11" font-weight="500" fill="#1C1F24">Color</text>
                                                <circle cx="157" cy="145" r="4.5" fill="#8B1A2A"/>
                                                <circle cx="168" cy="145" r="4.5" fill="#52575F"/>
                                                <circle cx="179" cy="145" r="4.5" fill="#E6E2DD" stroke="#C8C4BE" stroke-width="0.5"/>
                                                <circle cx="204" cy="145" r="8.5" fill="none" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <line x1="200" y1="145" x2="208" y2="145" stroke="#9EA4AD" stroke-width="1.25" stroke-linecap="round"/>
                                                <line x1="204" y1="141" x2="204" y2="149" stroke="#9EA4AD" stroke-width="1.25" stroke-linecap="round"/>
                                                <line x1="14" y1="159" x2="216" y2="159" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <text x="26" y="174" font-family="Inter,sans-serif" font-size="11" font-weight="500" fill="#1C1F24">Exterior</text>
                                                <circle cx="204" cy="171" r="8.5" fill="none" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <line x1="200" y1="171" x2="208" y2="171" stroke="#9EA4AD" stroke-width="1.25" stroke-linecap="round"/>
                                                <rect width="232" height="175" fill="url(#fp3)"/>
                                            </svg>
                                        </div>
                                        <div class="nav-mega-cta-content" data-comment="nav-mega-cta-content">
                                            <p class="nav-mega-cta-label" data-comment="nav-mega-cta-label">Build yours</p>
                                            <p class="nav-mega-cta-heading" data-comment="nav-mega-cta-heading">Design Your Own Shed</p>
                                            <p class="nav-mega-cta-note" data-comment="nav-mega-cta-note">Interactive 3D configurator with AR preview</p>
                                            <a href="#" class="btn-cta-card" data-comment="nav-mega-cta-btn">
                                                <svg data-comment="nav-mega-cta-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                                                Customize Shed
                                            </a>
                                        </div>
                                    </div>

                            </div><!-- /nav-mega-inner -->
                        </div><!-- /nav-mega -->
                    </li>

                    <!-- ABOUT -->
                    <li class="nav-item" id="navAbout" data-comment="nav-item-about">
                        <button class="nav-trigger" data-comment="nav-trigger-about">
                            About
                        </button>

                        <div class="nav-mega" data-comment="nav-mega-about">
                            <div class="nav-mega-inner" data-comment="nav-mega-about-inner">

                                <div class="nav-mega-body" data-comment="nav-mega-about-body">
                                <div class="nav-mega-header" data-comment="nav-mega-about-header">
                                    <span class="nav-mega-eyebrow" data-comment="nav-mega-about-eyebrow">
                                        About NCS Barns
                                    </span>
                                </div>

                                <div class="nav-mega-cols nav-mega-cols--about" data-comment="nav-mega-about-cols">

                                    <!-- Company -->
                                    <div class="nav-mega-col" data-comment="nav-mega-col-company">
                                        <p class="nav-mega-col-title" data-comment="nav-mega-col-title-company">Company</p>
                                        <ul class="nav-mega-list" data-comment="nav-mega-list-company">
                                            <li data-comment="nav-mega-li-about-company">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-about-company">About Company</a>
                                            </li>
                                            <li data-comment="nav-mega-li-testimonials">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-testimonials">Testimonials</a>
                                            </li>
                                            <li data-comment="nav-mega-li-gallery">
                                                <a href="gallery.html" class="nav-mega-link" data-comment="nav-mega-link-gallery">Gallery</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- Services -->
                                    <div class="nav-mega-col" data-comment="nav-mega-col-services">
                                        <p class="nav-mega-col-title" data-comment="nav-mega-col-title-services">Services</p>
                                        <ul class="nav-mega-list" data-comment="nav-mega-list-services">
                                            <li data-comment="nav-mega-li-delivery-reloc">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-delivery-reloc">Delivery &amp; Relocation</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- Care Guide -->
                                    <div class="nav-mega-col" data-comment="nav-mega-col-care-guide">
                                        <p class="nav-mega-col-title" data-comment="nav-mega-col-title-care-guide">Care Guide</p>
                                        <ul class="nav-mega-list" data-comment="nav-mega-list-care-guide">
                                            <li data-comment="nav-mega-li-care-guide">
                                                <a href="care-guide.html" class="nav-mega-link" data-comment="nav-mega-link-care-guide">Care Guide</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div><!-- /nav-mega-about-cols -->
                                </div><!-- /nav-mega-about-body -->

                                    <!-- CTA -->
                                    <div class="nav-mega-cta nav-mega-cta--light" data-comment="nav-mega-about-cta">
                                        <div class="nav-mega-cta-bg" data-comment="nav-mega-about-cta-bg">
                                            <svg viewBox="0 0 232 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <pattern id="dg3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.2" fill="#D4D0CB"/></pattern>
                                                    <linearGradient id="fa3" x1="0" y1="0" x2="0" y2="1"><stop offset="0.38" stop-color="#F4F1EE" stop-opacity="0"/><stop offset="0.78" stop-color="#F4F1EE"/></linearGradient>
                                                </defs>
                                                <rect width="232" height="148" fill="#F4F1EE"/>
                                                <rect width="232" height="148" fill="url(#dg3)"/>
                                                <path d="M 0,72 Q 55,66 92,74 Q 132,82 185,70 Q 210,65 232,68" stroke="#C8C4BE" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                                                <path d="M 82,0 Q 86,32 90,72 Q 93,102 86,148" stroke="#C8C4BE" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                                                <path d="M 0,105 Q 55,99 110,106 Q 162,112 232,100" stroke="#C8C4BE" stroke-width="1" stroke-linecap="round" fill="none" stroke-dasharray="5 4"/>
                                                <g transform="translate(44,90)">
                                                    <circle cx="0" cy="-7" r="7" fill="none" stroke="#C8C4BE" stroke-width="1.25"/>
                                                    <polygon points="-4,-1 4,-1 0,8" fill="#EAE7E3" stroke="#C8C4BE" stroke-width="1" stroke-linejoin="round"/>
                                                    <circle cx="0" cy="-7" r="2.5" fill="#D4D0CB"/>
                                                </g>
                                                <g transform="translate(163,68)">
                                                    <circle cx="0" cy="-7" r="7" fill="none" stroke="#C8C4BE" stroke-width="1.25"/>
                                                    <polygon points="-4,-1 4,-1 0,8" fill="#EAE7E3" stroke="#C8C4BE" stroke-width="1" stroke-linejoin="round"/>
                                                    <circle cx="0" cy="-7" r="2.5" fill="#D4D0CB"/>
                                                </g>
                                                <g transform="translate(92,50)">
                                                    <circle cx="0" cy="-10" r="10.5" fill="#8B1A2A"/>
                                                    <polygon points="-5.5,-1.5 5.5,-1.5 0,11" fill="#8B1A2A"/>
                                                    <circle cx="0" cy="-10" r="3.8" fill="white"/>
                                                </g>
                                                <circle cx="92" cy="40" r="18" fill="none" stroke="#8B1A2A" stroke-width="0.75" stroke-opacity="0.2"/>
                                                <circle cx="92" cy="40" r="26" fill="none" stroke="#8B1A2A" stroke-width="0.5" stroke-opacity="0.1"/>
                                                <rect width="232" height="148" fill="url(#fa3)"/>
                                            </svg>
                                        </div>
                                        <div class="nav-mega-cta-content" data-comment="nav-mega-about-cta-content">
                                            <p class="nav-mega-cta-label" data-comment="nav-mega-about-cta-label">Locations</p>
                                            <p class="nav-mega-cta-heading" data-comment="nav-mega-about-cta-heading">Visit Us Today</p>
                                            <p class="nav-mega-cta-note" data-comment="nav-mega-about-cta-note">3 locations across New York State</p>
                                            <a href="#" class="btn-cta-card" data-comment="nav-mega-about-cta-btn">
                                                <i class="ri-map-pin-line" data-comment="nav-mega-about-cta-btn-icon"></i>
                                                Contact Us
                                            </a>
                                        </div>
                                    </div>

                            </div><!-- /nav-mega-about-inner -->
                        </div><!-- /nav-mega-about -->
                    </li>

                    <!-- BUYING PROCESS -->
                    <li class="nav-item" id="navBuying" data-comment="nav-item-buying">
                        <button class="nav-trigger" data-comment="nav-trigger-buying">
                            Buying Process
                        </button>

                        <div class="nav-mega" data-comment="nav-mega-buying">
                            <div class="nav-mega-inner" data-comment="nav-mega-buying-inner">

                                <div class="nav-mega-body" data-comment="nav-mega-buying-body">
                                <div class="nav-mega-header" data-comment="nav-mega-buying-header">
                                    <span class="nav-mega-eyebrow" data-comment="nav-mega-buying-eyebrow">
                                        How to Buy
                                    </span>
                                </div>

                                <div class="nav-mega-cols nav-mega-cols--buying" data-comment="nav-mega-buying-cols">

                                    <!-- Financing -->
                                    <div class="nav-mega-col" data-comment="nav-mega-col-financial">
                                        <p class="nav-mega-col-title" data-comment="nav-mega-col-title-financial">Financing</p>
                                        <ul class="nav-mega-list" data-comment="nav-mega-list-financial">
                                            <li data-comment="nav-mega-li-rto">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-rto">Rent-To-Own Program</a>
                                            </li>
                                            <li data-comment="nav-mega-li-ncu">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-ncu">Northern Credit Union <i class="ri-arrow-right-up-line" data-comment="nav-mega-link-ncu-icon"></i></a>
                                            </li>
                                            <li data-comment="nav-mega-li-byf">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-byf">Back Yard Finance <i class="ri-arrow-right-up-line" data-comment="nav-mega-link-byf-icon"></i></a>
                                            </li>
                                            <li data-comment="nav-mega-li-uf">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-uf">Upgrade Finance <i class="ri-arrow-right-up-line" data-comment="nav-mega-link-uf-icon"></i></a>
                                            </li>
                                            <li data-comment="nav-mega-li-jmoney">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-jmoney">J-Money Financing <i class="ri-arrow-right-up-line" data-comment="nav-mega-link-jmoney-icon"></i></a>
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- Process -->
                                    <div class="nav-mega-col" data-comment="nav-mega-col-process">
                                        <p class="nav-mega-col-title" data-comment="nav-mega-col-title-process">Process</p>
                                        <ul class="nav-mega-list" data-comment="nav-mega-list-process">
                                            <li data-comment="nav-mega-li-dealers">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-dealers">Dealers</a>
                                            </li>
                                            <li data-comment="nav-mega-li-site-prep">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-site-prep">Site Preparation</a>
                                            </li>
                                            <li data-comment="nav-mega-li-delivery">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-delivery">Delivery</a>
                                            </li>
                                            <li data-comment="nav-mega-li-warranty">
                                                <a href="#" class="nav-mega-link" data-comment="nav-mega-link-warranty">Warranty</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div><!-- /nav-mega-buying-cols -->
                                </div><!-- /nav-mega-buying-body -->

                                    <!-- CTA -->
                                    <div class="nav-mega-cta nav-mega-cta--light" data-comment="nav-mega-buying-cta">
                                        <div class="nav-mega-cta-bg" data-comment="nav-mega-buying-cta-bg">
                                            <svg viewBox="0 0 232 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <linearGradient id="fb3" x1="0" y1="0" x2="0" y2="1"><stop offset="0.36" stop-color="#F4F1EE" stop-opacity="0"/><stop offset="0.74" stop-color="#F4F1EE"/></linearGradient>
                                                </defs>
                                                <rect width="232" height="175" fill="#F4F1EE"/>
                                                <rect x="15" y="15" width="204" height="134" rx="12" fill="#1C1F24" fill-opacity="0.045"/>
                                                <rect x="13" y="13" width="204" height="134" rx="12" fill="white" stroke="#E8E4DF" stroke-width="1"/>
                                                <text x="25" y="33" font-family="Inter,sans-serif" font-size="12" font-weight="600" fill="#1C1F24">Rent-to-Own Plans</text>
                                                <line x1="13" y1="46" x2="217" y2="46" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <rect x="13" y="46" width="204" height="34" fill="#FBF3F4"/>
                                                <circle cx="29" cy="63" r="7.5" fill="none" stroke="#8B1A2A" stroke-width="1.5"/>
                                                <circle cx="29" cy="63" r="3.5" fill="#8B1A2A"/>
                                                <text x="44" y="60" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#1C1F24">24 months</text>
                                                <text x="44" y="72" font-family="Inter,sans-serif" font-size="10" fill="#9EA4AD">from $291 / mo</text>
                                                <rect x="148" y="54" width="60" height="17" rx="8.5" fill="#8B1A2A" fill-opacity="0.1"/>
                                                <text x="178" y="66" font-family="Inter,sans-serif" font-size="9.5" font-weight="500" fill="#8B1A2A" text-anchor="middle">No deposit</text>
                                                <line x1="13" y1="80" x2="217" y2="80" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <circle cx="29" cy="97" r="7.5" fill="none" stroke="#D0CDC8" stroke-width="1.25"/>
                                                <text x="44" y="94" font-family="Inter,sans-serif" font-size="11" font-weight="500" fill="#1C1F24">36 months</text>
                                                <text x="44" y="106" font-family="Inter,sans-serif" font-size="10" fill="#9EA4AD">from $194 / mo</text>
                                                <line x1="13" y1="113" x2="217" y2="113" stroke="#E8E4DF" stroke-width="0.75"/>
                                                <circle cx="29" cy="130" r="7.5" fill="none" stroke="#D0CDC8" stroke-width="1.25"/>
                                                <text x="44" y="127" font-family="Inter,sans-serif" font-size="11" font-weight="500" fill="#1C1F24">60 months</text>
                                                <text x="44" y="139" font-family="Inter,sans-serif" font-size="10" fill="#9EA4AD">from $117 / mo</text>
                                                <rect width="232" height="175" fill="url(#fb3)"/>
                                            </svg>
                                        </div>
                                        <div class="nav-mega-cta-content" data-comment="nav-mega-buying-cta-content">
                                            <p class="nav-mega-cta-label" data-comment="nav-mega-buying-cta-label">Financing</p>
                                            <p class="nav-mega-cta-heading" data-comment="nav-mega-buying-cta-heading">Start Today</p>
                                            <p class="nav-mega-cta-note" data-comment="nav-mega-buying-cta-note">Rent-to-own from 24 to 60 months — no large upfront cost</p>
                                            <a href="#" class="btn-cta-card" data-comment="nav-mega-buying-cta-btn">
                                                <i class="ri-price-tag-3-line" data-comment="nav-mega-buying-cta-btn-icon"></i>
                                                Get a Quote
                                            </a>
                                        </div>
                                    </div>

                            </div><!-- /nav-mega-buying-inner -->
                        </div><!-- /nav-mega-buying -->
                    </li>

                    <!-- CONTACT -->
                    <li class="nav-item" data-comment="nav-item-contact">
                        <a href="#" class="nav-trigger" data-comment="nav-link-contact">Contact</a>
                    </li>

                </ul><!-- /nav-links -->

                <!-- ── Right side ── -->
                <div class="nav-right" data-comment="nav-right">

                    <div class="nav-search-wrap" data-comment="nav-search-wrap">
                        <div class="nav-search" data-comment="nav-search">
                            <svg class="nav-search-icon" data-comment="nav-search-icon" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8"/>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input
                                type="text"
                                class="nav-search-input"
                                id="navSearchInput"
                                placeholder="Search products…"
                                autocomplete="off"
                                data-comment="nav-search-input" />
                        </div>

                        <!-- Search Dropdown -->
                        <div class="sd-dropdown" id="searchDropdown" data-comment="search-dropdown">
                            <div class="sd-body" id="sdBody" data-comment="search-dropdown-body"></div>
                        </div>
                    </div>

                    <a href="cart.html" class="nav-icon-btn" data-comment="nav-cart-btn" title="Cart" aria-label="Open cart">
                        <i class="ri-shopping-bag-line" data-comment="nav-cart-icon"></i>
                        <span class="nav-cart-badge" data-comment="nav-cart-badge"></span>
                    </a>

                    <a href="account.html" class="nav-icon-btn" data-comment="nav-account-btn" title="My Account" aria-label="My Account">
                        <i class="ri-user-line" data-comment="nav-account-icon"></i>
                    </a>

                    <a href="#" class="btn-primary nav-customize-btn" data-comment="nav-customize-btn"><i class="ri-box-3-line"></i> Customize Shed</a>

                    <!-- Hamburger (mobile only) -->
                    <button class="nav-hamburger" id="navHamburger" data-comment="nav-hamburger" aria-label="Open navigation" aria-expanded="false">
                        <i class="ri-menu-line"></i>
                    </button>

                </div><!-- /nav-right -->

            </div><!-- /nav-inner -->
        </header>

        <!-- ── MOBILE NAV OVERLAY ── -->
        <div class="mobile-nav-overlay" id="mobileNavOverlay" data-comment="mobile-nav-overlay"></div>

        <!-- ── MOBILE NAV DRAWER ── -->
        <nav class="mobile-nav" id="mobileNav" data-comment="mobile-nav" aria-label="Mobile navigation">

            <!-- Header -->
            <div class="mobile-nav-header" data-comment="mobile-nav-header">
                <a href="index.html" class="mobile-nav-logo" data-comment="mobile-nav-logo">
                    <img src="assets/Logo.png" alt="NCS Barns" class="mobile-nav-logo-img" data-comment="mobile-nav-logo-img" />
                    <span class="mobile-nav-logo-name" data-comment="mobile-nav-logo-name">NCS Barns</span>
                </a>
                <button class="mobile-nav-close" id="mobileNavClose" data-comment="mobile-nav-close" aria-label="Close navigation">
                    <i class="ri-close-line"></i>
                </button>
            </div>

            <!-- Nav links -->
            <ul class="mobile-nav-links" data-comment="mobile-nav-links">
                <li data-comment="mobile-nav-li-products"><a href="#" data-comment="mobile-nav-link-products">Products</a></li>
                <li data-comment="mobile-nav-li-gallery"><a href="gallery.html" data-comment="mobile-nav-link-gallery">Gallery</a></li>
                <li data-comment="mobile-nav-li-events"><a href="#" data-comment="mobile-nav-link-events">Events</a></li>
                <li data-comment="mobile-nav-li-blog"><a href="#" data-comment="mobile-nav-link-blog">Blog</a></li>
                <li data-comment="mobile-nav-li-contact"><a href="#" data-comment="mobile-nav-link-contact">Contact</a></li>
            </ul>

            <hr class="mobile-nav-divider" data-comment="mobile-nav-divider" />

            <!-- CTA -->
            <a href="#" class="btn-primary mobile-nav-cta" data-comment="mobile-nav-cta"><i class="ri-box-3-line"></i> Customize Shed</a>

            <!-- Icon actions -->
            <div class="mobile-nav-actions" data-comment="mobile-nav-actions">
                <a href="cart.html" class="nav-icon-btn" data-comment="mobile-nav-cart-btn" title="Cart" aria-label="Open cart" style="flex:1; border-radius:9px; border:1.5px solid var(--color-border); background:var(--color-bg);">
                    <i class="ri-shopping-bag-line" data-comment="mobile-nav-cart-icon"></i>
                </a>
                <a href="account.html" class="nav-icon-btn" data-comment="mobile-nav-account-btn" title="My Account" aria-label="My Account" style="flex:1; border-radius:9px; border:1.5px solid var(--color-border); background:var(--color-bg);">
                    <i class="ri-user-line" data-comment="mobile-nav-account-icon"></i>
                </a>
            </div>

        </nav><!-- /mobile-nav -->
  `;

  class NcsNav extends HTMLElement {
    connectedCallback() {
      // Inject CSS once
      if (!document.getElementById('ncs-nav-styles')) {
        const s = document.createElement('style');
        s.id = 'ncs-nav-styles';
        s.textContent = NAV_CSS;
        document.head.appendChild(s);
      }
      // Render nav
      this.innerHTML = NAV_HTML;
      // Boot
      this._initMegaMenus();
      this._initScroll();
      this._initHamburger();
      this._initSearch();
    }

    _initMegaMenus() {
      const navItems = document.querySelectorAll('.nav-item');
      const backdrop = document.getElementById('navBackdrop');
      let active = null;
      let closeTimer = null;

      function open(item) {
        if (active && active !== item) closeItem(active);
        item.classList.add('is-open');
        backdrop.classList.add('is-open');
        active = item;
      }

      function closeItem(item) {
        item.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        active = null;
      }

      function closeAll() {
        navItems.forEach(i => i.classList.remove('is-open'));
        backdrop.classList.remove('is-open');
        active = null;
      }

      navItems.forEach(item => {
        if (!item.querySelector('.nav-trigger') || item.querySelector('.nav-trigger').tagName === 'A') return;

        item.addEventListener('mouseenter', () => {
          clearTimeout(closeTimer);
          open(item);
        });

        item.addEventListener('mouseleave', () => {
          closeTimer = setTimeout(closeAll, 120);
        });
      });

      // Keep menu open when cursor moves into the mega panel
      document.querySelectorAll('.nav-mega').forEach(panel => {
        panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
        panel.addEventListener('mouseleave', () => {
          closeTimer = setTimeout(closeAll, 120);
        });
      });

      backdrop.addEventListener('mouseenter', closeAll);
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAll();
      });
    }

    _initScroll() {
      const navRoot = document.getElementById('navRoot');
      if (!navRoot) return;
      window.addEventListener('scroll', () => {
        navRoot.classList.toggle('is-scrolled', window.scrollY > 4);
      }, { passive: true });
    }

    _initHamburger() {
      const hamburger = document.getElementById('navHamburger');
      const mobileNav = document.getElementById('mobileNav');
      const overlay   = document.getElementById('mobileNavOverlay');
      const closeBtn  = document.getElementById('mobileNavClose');

      if (!hamburger || !mobileNav) return;

      function openMobileNav() {
        mobileNav.classList.add('is-open');
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        hamburger.setAttribute('aria-expanded', 'true');
      }

      function closeMobileNav() {
        mobileNav.classList.remove('is-open');
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      }

      hamburger.addEventListener('click', openMobileNav);
      closeBtn.addEventListener('click', closeMobileNav);
      overlay.addEventListener('click', closeMobileNav);
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileNav(); });

      mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', closeMobileNav);
      });
    }

    _initSearch() {
      const input = document.getElementById('navSearchInput');
      if (!input) return;
      input.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        const q = input.value.trim();
        if (!q) return;
        window.location.href = 'search.html?q=' + encodeURIComponent(q);
      });
    }
  }

  customElements.define('ncs-nav', NcsNav);
})();
