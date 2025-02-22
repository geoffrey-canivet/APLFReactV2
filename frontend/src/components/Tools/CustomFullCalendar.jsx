import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';           // Composant principal de FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';          // Pour la vue mensuelle (day grid)
import timeGridPlugin from '@fullcalendar/timegrid';        // Pour les vues semaine/jour (time grid)
import interactionPlugin from '@fullcalendar/interaction';  // Pour la sélection, le glisser-déposer, etc.
import listPlugin from '@fullcalendar/list';                // Pour la vue liste
import frLocale from '@fullcalendar/core/locales/fr';
import useTransacOccasStore from "../../store/useTransacOccasStore.js";
import usePeriodStore from "../../store/usePeriodStore.js";       // Locale français (compatible avec la Belgique)

/**
 * Composant FullCalendar personnalisé avec événements en forme de puce colorée.
 */
const CustomFullCalendar = () => {

    // STORE
    const {fetchOccasByPeriod, categories} = useTransacOccasStore()
    const { month, year} = usePeriodStore();

    const [events, setEvents] = useState([]);

    // RECUP CATEGORIES - TRANSACTIONS
    useEffect(() => {
        fetchOccasByPeriod(month, year);
    }, [month, year]);

    useEffect(() => {
        // Transformation des données pour créer le tableau d'events
        const newEvents = [];
        categories.forEach(category => {
            category.transactions.forEach(transaction => {
                transaction.subTransactions.forEach(subTx => {
                    const [day, month, year] = subTx.date.split('/').map(Number);
                    const dateObj = new Date(year, month - 1, day);
                    newEvents.push({
                        title: `${transaction.name} ${subTx.amount} €`,
                        date: dateObj,
                        backgroundColor: "#01A3FF",
                        borderColor: "#01A3FF"
                    });
                });
            });
        });
        setEvents(newEvents);
        console.log(events)
    }, [categories]);




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
        events: events,

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
