document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen-view');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active classes
            navItems.forEach(nav => nav.classList.remove('active'));
            screens.forEach(screen => screen.classList.remove('active'));
            
            // Add active class to clicked
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Request Creation Form Submission
    const creationForm = document.getElementById('creation-form');
    if (creationForm) {
        creationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('New Delivery Request created successfully!');
            creationForm.reset();
        });
    }

    // Prediction Engine Logic
    const btnPredict = document.getElementById('btn-predict');
    const predResult = document.getElementById('pred-result');
    if (btnPredict && predResult) {
        btnPredict.addEventListener('click', () => {
            btnPredict.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing Data...';
            setTimeout(() => {
                predResult.classList.remove('hidden');
                btnPredict.innerHTML = '<i class="fa-solid fa-check"></i> Prediction Complete';
                btnPredict.classList.remove('btn-secondary');
                btnPredict.classList.add('btn-primary');
            }, 1200);
        });
    }

    // Drone Selection Logic
    const droneCards = document.querySelectorAll('.drone-card:not(.disabled)');
    droneCards.forEach(card => {
        card.addEventListener('click', () => {
            droneCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    // Dataset Selection Logic
    const requestSelect = document.getElementById('request-select');
    if (requestSelect) {
        const datasets = {
            'REQ-8042': { wind: 4.2, payload: 2.5, temp: 28, hum: 65, battery: '38%', route: 'Hub A → Hub C → Customer' },
            'REQ-8043': { wind: 1.5, payload: 4.8, temp: 32, hum: 55, battery: '52%', route: 'Hub B → Customer' },
            'REQ-8044': { wind: 6.8, payload: 1.2, temp: 22, hum: 85, battery: '45%', route: 'Hub A → Hub B → Customer' }
        };
        
        requestSelect.addEventListener('change', (e) => {
            const data = datasets[e.target.value];
            document.getElementById('wind-speed').value = data.wind;
            document.getElementById('payload-weight').value = data.payload;
            document.getElementById('temperature').value = data.temp;
            document.getElementById('humidity').value = data.hum;
            
            // reset prediction button
            if (btnPredict) {
                btnPredict.classList.remove('btn-primary');
                btnPredict.classList.add('btn-secondary');
                btnPredict.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Execute Prediction';
                predResult.classList.add('hidden');
                
                // Update result box texts
                predResult.querySelector('.big-value').innerText = data.battery;
                predResult.querySelector('.route-hops').innerHTML = data.route.replace(/→/g, '<i class="fa-solid fa-arrow-right"></i>');
            }
        });
    }

    // Initialize Chart.js on Dashboard
    const ctx = document.getElementById('energyChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
                datasets: [{
                    label: 'Fleet Energy Usage (kWh)',
                    data: [12, 19, 15, 25, 22, 30, 28],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    },
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    }
                }
            }
        });
    }
});
