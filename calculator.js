window.addEventListener('DOMContentLoaded', function() {
    const quantity = document.getElementById('quantity');
    const optionsGroup = document.getElementById('optionsGroup');
    const propertiesGroup = document.getElementById('propertiesGroup');
    const totalPrice = document.getElementById('totalPrice');

    const prices = {
        basic: 4500,
        premium: 5000,
        vip: 8000
    };

    const optionPrices = {
        standard: 0,
        express: 500,
        priority: 1000
    };

    function getSelectedType() {
        return document.querySelector('input[name="serviceType"]:checked').value;
    }

    function calculate() {
        const type = getSelectedType();
        const count = parseInt(quantity.value) || 1;
        let price = prices[type];

        if (type === 'premium') {
            price += optionPrices[document.getElementById('options').value];
        }

        if (type === 'vip' && document.getElementById('property').checked) {
            price += 1500;
        }

        totalPrice.textContent = price * count;
    }

    function updateVisibility() {
        const type = getSelectedType();

        optionsGroup.classList.toggle('hidden', type !== 'premium');
        propertiesGroup.classList.toggle('hidden', type !== 'vip');
    }

    function handleTypeChange() {
        updateVisibility();
        calculate();
    }

    // События
    quantity.addEventListener('input', calculate);
    document.querySelectorAll('input[name="serviceType"]').forEach(radio => {
        radio.addEventListener('change', handleTypeChange);
    });
    document.getElementById('options').addEventListener('change', calculate);
    document.getElementById('property').addEventListener('change', calculate);

    // Инициализация
    updateVisibility();
    calculate();
});