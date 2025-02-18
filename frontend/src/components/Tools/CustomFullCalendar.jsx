import React from 'react';
import FullCalendar from '@fullcalendar/react';           // Composant principal de FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';          // Pour la vue mensuelle (day grid)
import timeGridPlugin from '@fullcalendar/timegrid';        // Pour les vues semaine/jour (time grid)
import interactionPlugin from '@fullcalendar/interaction';  // Pour la sélection, le glisser-déposer, etc.
import listPlugin from '@fullcalendar/list';                // Pour la vue liste
import frLocale from '@fullcalendar/core/locales/fr';       // Locale français (compatible avec la Belgique)

/**
 * Composant FullCalendar personnalisé avec événements en forme de puce colorée.
 */
const CustomFullCalendar = () => {
    // Configuration du calendrier avec un maximum d'options
    const calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: 'dayGridMonth',  // Vue initiale : mois
        locale: frLocale,             // Configuration de la langue en français (Belgique)

        // Barre d'outils avec navigation et sélection des vues
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },

        dayMaxEvents: 3,

        // Définition des événements (chaque événement représente une dépense)
        events: [
            {
                title: "Café - 3€",
                date: "2025-02-10",
                backgroundColor: "#ff4081",  // Couleur flashy personnalisable
                borderColor: "#ff4081"
            },
            {
                title: "Café - 3€",
                date: "2025-02-10",
                backgroundColor: "#ff4081",  // Couleur flashy personnalisable
                borderColor: "#ff4081"
            },
            {
                title: "Café - 3€",
                date: "2025-02-10",
                backgroundColor: "#ff4081",  // Couleur flashy personnalisable
                borderColor: "#ff4081"
            },
            {
                title: "Café - 3€",
                date: "2025-02-10",
                backgroundColor: "#ff4081",  // Couleur flashy personnalisable
                borderColor: "#ff4081"
            },
            {
                title: "Café - 3€",
                date: "2025-02-10",
                backgroundColor: "#ff4081",  // Couleur flashy personnalisable
                borderColor: "#ff4081"
            },
            {
                title: "Déjeuner - 15€",
                date: "2025-02-15",
                backgroundColor: "#448aff",
                borderColor: "#448aff"
            },
            {
                title: "Transport - 2.50€",
                date: "2025-02-20",
                backgroundColor: "#69f0ae",
                borderColor: "#69f0ae"
            },
            {
                title: "Bière - 5€",
                date: "2025-02-22",
                backgroundColor: "#ffea00",
                borderColor: "#ffea00"
            }
        ],

        selectable: true,  // Permet de sélectionner des plages de dates
        editable: true,    // Active le glisser-déposer et le redimensionnement des événements
        droppable: true,   // Permet de déposer des éléments externes sur le calendrier

        /**
         * Rendu personnalisé de l'événement :
         * Affiche une puce colorée (la couleur de l'événement) suivie du titre (nom et prix)
         */
        eventContent: function(arg) {
            // Style pour la puce colorée
            const bulletStyle = {
                backgroundColor: arg.event.backgroundColor, // Utilise la couleur définie pour l'événement
                borderRadius: '50%',
                display: 'inline-block',
                width: '10px',
                height: '10px',
                marginRight: '8px',
                verticalAlign: 'middle'
            };

            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={bulletStyle}></span>
                    <span>{arg.event.title}</span>
                </div>
            );
        },

        // Callback lors du clic sur un événement
        eventClick: function(info) {
            alert(`Événement: ${info.event.title}\nDate: ${info.event.start.toLocaleDateString('fr-BE')}`);
        },

        // Callback lors du déplacement d'un événement (drag & drop)
        eventDrop: function(info) {
            console.log("Événement déplacé:", info.event.title);
        },

        // Callback lors du redimensionnement d'un événement
        eventResize: function(info) {
            console.log("Événement redimensionné:", info.event.title);
        },

        eventDidMount: function(info) {
            info.el.style.backgroundColor = 'transparent'; // Fond transparent
            info.el.style.borderColor = 'transparent';     // Bordure transparente (optionnel)
        },

        // Options supplémentaires pour personnaliser l'affichage du calendrier
        height: 650,         // Hauteur du calendrier
        nowIndicator: true,  // Affiche l'indicateur de l'heure actuelle
        navLinks: true       // Permet la navigation via des liens sur les jours ou semaines
    };

    return (
        <div>
            {/* Rendu du composant FullCalendar avec toutes les options configurées */}
            <FullCalendar {...calendarOptions} />
        </div>
    );
};

export default CustomFullCalendar;
