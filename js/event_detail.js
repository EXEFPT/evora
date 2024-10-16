document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventType = urlParams.get('type');
    const eventIndex = parseInt(urlParams.get('index'), 10);

    console.log(`Event Type: ${eventType}, Event Index: ${eventIndex}`);

    fetch('data.json')
        .then((response) => response.json())
        .then((data) => {
            if (!data.event || !data.event[eventType] || !data.event[eventType][eventIndex]) {
                throw new Error('Event not found');
            }

            const event = data.event[eventType][eventIndex];
            console.log('Event Data:', event);

            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.price);

            const tagsHtml = event.listEvent
                .map((event) => `<span class="badge bg-primary me-1">${event}</span>`)
                .join("");

            const eventDetailContainer = document.getElementById('event-detail');
            eventDetailContainer.innerHTML = `
                <div class="card mt-5">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="./${event.image}.jpg" class="card-img" alt="${event.name}" style="width: 100%; height: 400px; object-fit: cover;">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h2 class="card-title">${event.name}</h2>
                                <p class="card-text">${event.about}</p>
                                <p class="card-text"><strong>Địa chỉ:</strong> ${event.address}</p>
                                <p class="card-text"><strong>Giá:</strong> ${formattedPrice} / người</p>
                                <p class="card-text"><strong>Kinh nghiệm:</strong> ${event.experience}</p>
                                <p class="card-text"><strong>Chuyên:</strong></p>
                                <p class="card-text"> ${tagsHtml}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Populate the form fields
            const eventTypeSelect = document.getElementById('event-type');
            event.listEvent.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                eventTypeSelect.appendChild(option);
            });

            const priceField = document.getElementById('price');
            priceField.value = event.price;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            document.getElementById("event-detail").innerHTML =
                '<p class="text-danger">Event not found.</p>';
        });
});