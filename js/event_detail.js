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
                                <p class="card-text"><strong>Giá chỉ:</strong> ${formattedPrice} / người</p>
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

    // Additional JavaScript code from the HTML file
    fetch("./commons/topbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("topbar").innerHTML = data;
        });

    fetch("./commons/navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar").innerHTML = data;

            // Determine the current page
            const currentPage = window.location.pathname.split("/").pop();

            // Add active class to the corresponding nav link
            const navLinks = document.querySelectorAll(".nav-item.nav-link");
            navLinks.forEach((link) => {
                if (link.getAttribute("href") === currentPage) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });

            // Add click event listeners to update active class on click
            navLinks.forEach((link) => {
                link.addEventListener("click", function () {
                    navLinks.forEach((nav) => nav.classList.remove("active"));
                    this.classList.add("active");
                });
            });
        });

    fetch("./commons/footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer").innerHTML = data;
        });

    // Function to format price
    function formatPrice(price) {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
            .format(price)
            .replace("₫", "đ / người");
    }

    const eventTypeSelect = document.getElementById("event-type");
    const eventDetailContainer = document.getElementById("event-detail");

    // Fetch event details and populate event types
    fetch("./data/event_details.json")
        .then((response) => response.json())
        .then((data) => {
            const eventTypes = data.map((event) => event.type);
            eventTypes.forEach((type) => {
                const option = document.createElement("option");
                option.value = type;
                option.textContent = type;
                eventTypeSelect.appendChild(option);
            });

            // Populate event details
            eventDetailContainer.innerHTML = data
                .map(
                    (event) => `
                    <div class="event">
                        <h3>${event.name}</h3>
                        <p>${event.description}</p>
                    </div>
                `
                )
                .join("");
        });

    const priceInput = document.getElementById("price");
    const priceValue = 100000; 
    priceInput.value = formatPrice(priceValue);
    console.log(priceInput.value);

    const participantsInput = document.getElementById("participants");
    const totalPriceInput = document.getElementById("total-price");

    participantsInput.addEventListener("input", function () {
        let participants = parseInt(participantsInput.value) || 0;
        if (participants < 2) {
            participants = 2;
            participantsInput.value = 2;
        }
        const totalPrice = participants * priceValue;
        totalPriceInput.value = formatPrice(totalPrice);
    });

    // Test cases
    function runTests() {
        console.log("Running tests...");

        // Test 1: Check initial price value
        console.assert(
            priceInput.value === formatPrice(priceValue),
            "Test 1 Failed"
        );

        // Test 2: Check total price calculation for 5 participants
        participantsInput.value = 5;
        participantsInput.dispatchEvent(new Event("input"));
        console.assert(
            totalPriceInput.value === formatPrice(5 * priceValue),
            "Test 2 Failed"
        );

        // Test 3: Check total price calculation for 0 participants
        participantsInput.value = 0;
        participantsInput.dispatchEvent(new Event("input"));
        console.assert(
            totalPriceInput.value === formatPrice(2 * priceValue),
            "Test 3 Failed"
        );

        console.log("All tests passed!");
    }

    runTests();
});