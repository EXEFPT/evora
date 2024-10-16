document.addEventListener('DOMContentLoaded', () => {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const teamMembers = data.event.sinhnhat.slice(0, 3); 
            const teamContainer = document.getElementById('team-container');
            teamContainer.innerHTML = teamMembers.map(member => {
                const imagePath = `./${member.image}.jpg`;
                return `
                    <div class="col-lg-4 col-md-6">
                        <div class="team-item">
                            <div class="position-relative overflow-hidden">
                                <img class="img-fluid w-100" src="${imagePath}" alt="${member.name}" style="height: 350px; object-fit: cover;">
                                <div class="team-overlay w-100 h-100 position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
                                    <div class="d-flex align-items-center justify-content-center">
                                        <a href="menu.html" class="btn btn-primary border-inner py-3 px-5">Xem Chi tiết</a>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-dark border-inner text-center p-4">
                                <h4 class="text-uppercase text-primary">${member.name}</h4>
                                <p class="text-white m-0">${member.address}</p>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const teamMembers = data.event.sinhnhat; 
            const teamContainer = document.getElementById('all-team-container');
            teamContainer.innerHTML = teamMembers.map(member => {
                const imagePath = `./${member.image}.jpg`;
                return `
                    <div class="col-lg-4 col-md-6">
                        <div class="team-item">
                            <div class="position-relative overflow-hidden">
                                <img class="img-fluid w-100" src="${imagePath}" alt="${member.name}" style="height: 350px; object-fit: cover;">
                                <div class="team-overlay w-100 h-100 position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
                                    <div class="d-flex align-items-center justify-content-center">
                                        <a href="menu.html" class="btn btn-primary border-inner py-3 px-5">Xem Chi tiết</a>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-dark border-inner text-center p-4">
                                <h4 class="text-uppercase text-primary">${member.name}</h4>
                                <p class="text-white m-0">${member.address}</p>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        })
        .catch(error => console.error('Error fetching data:', error));
});