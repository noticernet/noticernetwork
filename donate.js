/* Enhanced Network Selector */
.network-selector {
    margin: 15px 0;
}

.network-options {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
}

.network-btn {
    padding: 6px 12px;
    border: 1px solid rgba(255,255,255,0.2);
    background: transparent;
    color: var(--muted);
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.3s ease;
}

.network-btn:hover,
.network-btn.active {
    background: #fff;
    color: #000;
    border-color: #fff;
}

/* Enhanced Donation Summary */
.enhanced-summary {
    text-align: left;
}

.enhanced-summary h4 {
    margin-bottom: 15px;
    text-align: center;
    color: #fff;
}

.summary-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.summary-line.total {
    border-bottom: none;
    border-top: 2px solid rgba(255,255,255,0.2);
    padding-top: 12px;
    margin-top: 12px;
    font-weight: bold;
}

.summary-label {
    color: var(--muted);
}

.summary-value {
    font-weight: 700;
    color: #fff;
}

.conversion-note {
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted);
    margin-top: 12px;
    font-style: italic;
}

/* Price Change Indicators */
.price-change {
    font-size: 0.7rem;
    margin-top: 4px;
    font-weight: 600;
}

/* Loading States */
.loading {
    opacity: 0.7;
    pointer-events: none;
}

/* Focus styles for accessibility */
button:focus,
.amt-btn:focus,
.crypto-item:focus {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
}

/* Animation for crypto items */
.crypto-item {
    transition: all 0.3s ease;
}

.crypto-item.pulse {
    animation: pulse 1s ease-in-out;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

/* Enhanced responsive design */
@media (max-width: 768px) {
    .network-options {
        flex-direction: column;
    }
    
    .network-btn {
        width: 100%;
    }
    
    .enhanced-summary {
        font-size: 0.9rem;
    }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
    .toast {
        background: #000;
        color: #fff;
        border: 1px solid #333;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
