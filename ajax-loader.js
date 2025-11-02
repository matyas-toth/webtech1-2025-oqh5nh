$(document).ready(function() {
    
    loadServices();
    loadContactInfo();
    loadVeterinarians();
    loadGallery();
    loadOpeningHours();
    loadServicesTable();
    loadContactSidebar();
    
});

function loadServices() {
    $.ajax({
        url: 'szolgaltatasok.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const container = $('#services-container');
            container.empty();
            
            if (data.szolgaltatasok && data.szolgaltatasok.length > 0) {
                let html = '<div class="services-grid">';
                data.szolgaltatasok.slice(0, 4).forEach(function(service) {
                    html += '<div class="service-card">';
                    html += '<h3>' + service.nev + '</h3>';
                    html += '<p>' + service.leiras + '</p>';
                    html += '<span class="price">' + service.ar + ' Ft</span>';
                    html += '</div>';
                });
                html += '</div>';
                container.html(html);
                container.hide().fadeIn(800);
            }
        },
        error: function() {
            $('#services-container').html('<p>Hiba történt a szolgáltatások betöltésekor.</p>');
        }
    });
}

function loadServicesTable() {
    $.ajax({
        url: 'szolgaltatasok.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const tbody = $('#services-tbody');
            tbody.empty();
            
            if (data.szolgaltatasok && data.szolgaltatasok.length > 0) {
                data.szolgaltatasok.forEach(function(service) {
                    const row = '<tr>' +
                        '<td>' + service.nev + '</td>' +
                        '<td>' + service.leiras + '</td>' +
                        '<td>' + service.ar + ' Ft</td>' +
                        '</tr>';
                    tbody.append(row);
                });
            }
            
            const additionalInfo = $('#additional-info');
            if (data.info) {
                let infoHtml = '<p><strong>' + data.info.megjegyzes + '</strong></p>';
                if (data.info.fizetesi_modok) {
                    infoHtml += '<p>Fizetési módok: ' + data.info.fizetesi_modok.join(', ') + '</p>';
                }
                additionalInfo.html(infoHtml);
            }
        },
        error: function() {
            $('#services-tbody').html('<tr><td colspan="3">Hiba történt az adatok betöltésekor.</td></tr>');
        }
    });
}

function loadContactInfo() {
    $.ajax({
        url: 'kapcsolat.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const container = $('#contact-info-container');
            container.empty();
            
            if (data.kapcsolat) {
                const contact = data.kapcsolat;
                let html = '<div class="contact-details">';
                
                if (contact.cim) {
                    html += '<div class="contact-item">';
                    html += '<h3>Cím</h3>';
                    html += '<p>' + contact.cim.iranyitoszam + ' ' + contact.cim.varos + '</p>';
                    html += '<p>' + contact.cim.utca + ' ' + contact.cim.hazszam + '</p>';
                    html += '</div>';
                }
                
                if (contact.telefon) {
                    html += '<div class="contact-item">';
                    html += '<h3>Telefon</h3>';
                    html += '<p>Fő: ' + contact.telefon.fo + '</p>';
                    html += '<p>Mobil: ' + contact.telefon.mobil + '</p>';
                    html += '<p>Sürgősségi: ' + contact.telefon.surgos + '</p>';
                    html += '</div>';
                }
                
                if (contact.email) {
                    html += '<div class="contact-item">';
                    html += '<h3>Email</h3>';
                    html += '<p>Info: <a href="mailto:' + contact.email.info + '">' + contact.email.info + '</a></p>';
                    html += '<p>Időpont: <a href="mailto:' + contact.email.idopont + '">' + contact.email.idopont + '</a></p>';
                    html += '</div>';
                }
                
                html += '</div>';
                container.html(html);
            }
        },
        error: function() {
            $('#contact-info-container').html('<p>Hiba történt a kapcsolati információk betöltésekor.</p>');
        }
    });
}

function loadContactSidebar() {
    $.ajax({
        url: 'kapcsolat.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const sidebar = $('#contact-info-sidebar');
            sidebar.empty();
            
            if (data.kapcsolat && data.kapcsolat.telefon) {
                let html = '<p><strong>Telefon:</strong></p>';
                html += '<p>' + data.kapcsolat.telefon.fo + '</p>';
                sidebar.html(html);
            }
            
            const footerContact = $('#footer-contact');
            if (footerContact && data.kapcsolat && data.kapcsolat.email) {
                footerContact.html('<p>Email: ' + data.kapcsolat.email.info + '</p>');
            }
        },
        error: function() {
            $('#contact-info-sidebar').html('<p>Betöltési hiba</p>');
        }
    });
}

function loadOpeningHours() {
    $.ajax({
        url: 'kapcsolat.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const container = $('#opening-hours-container');
            container.empty();
            
            if (data.kapcsolat && data.kapcsolat.nyitvatartas) {
                const hours = data.kapcsolat.nyitvatartas;
                let html = '<ul>';
                
                Object.keys(hours).forEach(function(day) {
                    const dayName = day.charAt(0).toUpperCase() + day.slice(1);
                    html += '<li><strong>' + dayName + ':</strong> ' + hours[day] + '</li>';
                });
                
                html += '</ul>';
                container.html(html);
            }
        },
        error: function() {
            $('#opening-hours-container').html('<p>Hiba történt a nyitvatartás betöltésekor.</p>');
        }
    });
}

function loadVeterinarians() {
    $.ajax({
        url: 'allatorvosok.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const container = $('#allatorvosok-container');
            container.empty();
            
            if (data.allatorvosok && data.allatorvosok.length > 0) {
                let html = '<div class="veterinarians-grid">';
                
                data.allatorvosok.forEach(function(doc) {
                    html += '<div class="vet-card">';
                    html += '<img src="' + doc.kep + '" alt="' + doc.nev + '" style="width: 200px; height: 200px; object-fit: cover;">';
                    html += '<h3>' + doc.nev + '</h3>';
                    html += '<p><strong>Szakterület:</strong> ' + doc.szakterulet + '</p>';
                    html += '<p><strong>Tapasztalat:</strong> ' + doc.tapasztalat + ' év</p>';
                    html += '<p>' + doc.leiras + '</p>';
                    html += '</div>';
                });
                
                html += '</div>';
                
                if (data.statisztikak) {
                    html += '<div class="stats">';
                    html += '<h3>Statisztikáink</h3>';
                    html += '<p>Összes műtét: ' + data.statisztikak.osszes_mutet + '</p>';
                    html += '<p>Összes vizsgálat: ' + data.statisztikak.osszes_vizsgalat + '</p>';
                    html += '<p>Elengedett állat: ' + data.statisztikak.elengedett_allat + '</p>';
                    html += '</div>';
                }
                
                container.html(html);
            }
            
            const quickInfo = $('#quick-info-sidebar');
            if (quickInfo && data.allatorvosok) {
                quickInfo.html('<p>Csapatunk ' + data.allatorvosok.length + ' állatorvosból áll.</p>');
            }
        },
        error: function() {
            $('#allatorvosok-container').html('<p>Hiba történt az állatorvosok adatainak betöltésekor.</p>');
        }
    });
}

function loadGallery() {
    $.ajax({
        url: 'galeria.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const container = $('#gallery-container');
            container.empty();
            
            if (data.kepek && data.kepek.length > 0) {
                data.kepek.forEach(function(image) {
                    const galleryItem = $('<div>').addClass('gallery-item');
                    const img = $('<img>').attr('src', image.url).attr('alt', image.cim);
                    const title = $('<h4>').text(image.cim);
                    const desc = $('<p>').text(image.leiras);
                    
                    galleryItem.append(img);
                    galleryItem.append(title);
                    galleryItem.append(desc);
                    
                    container.append(galleryItem);
                });
                $('#gallery-container').children().hide().each(function(index) {
                    $(this).delay(index * 100).fadeIn(300);
                });
            }
        },
        error: function() {
            $('#gallery-container').html('<p>Hiba történt a galéria betöltésekor.</p>');
        }
    });
}

