import React, {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Importation des composants de Swiper



import 'swiper/css'; // Styles de base de Swiper
import 'swiper/css/navigation'; // Styles pour la navigation
import 'swiper/css/pagination'; // Styles pour la pagination
import 'swiper/css/scrollbar'; // Styles pour la barre de défilement

import {Autoplay, Navigation, Pagination, Scrollbar} from 'swiper/modules';

import * as Icons from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


import cardData from "../../utils/DB.js";
import useTransacFixeStore from "../../store/useTransacFixeStore.js";
import useTransacRevenuStore from "../../store/useTransacRevenuStore.js";
import useTransacOccasStore from "../../store/useTransacOccasStore.js";

const SwiperDashboard = () => {

    const calculateTotal = (transactions) => {
        return transactions.reduce((total, transaction) => total + transaction.amount, 0);
    };

    const calculateTotalOccas = (categories) => {
        return categories.reduce((totalCategory, category) => {
            return totalCategory + category.transactions.reduce((totalTransaction, transaction) => {
                return totalTransaction + transaction.subTransactions.reduce((totalSub, subTransaction) => {
                    return totalSub + subTransaction.amount;
                }, 0); // Somme des sous-transactions
            }, 0); // Somme des transactions
        }, 0); // Somme des catégories
    };


    // STORE
    const { categories: categoriesFixe } = useTransacFixeStore();
    const { categories: categoriesRevenu } = useTransacRevenuStore();
    const { categories: categoriesOccasionnelle } = useTransacOccasStore();

    console.log(categoriesFixe);
    console.log(categoriesOccasionnelle);



    return (
        <div className="pt-0 mt px-3">
            <Swiper
                className="swiper-container"
                // Modules que vous utilisez
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                navigation={false}
                pagination={false}
                scrollbar={false}
                spaceBetween={20}
                /*                onSlideChange={() => console.log('Slide changed!')} // Événement de changement de slide
                                onSwiper={(swiper) => console.log(swiper)} // Instance Swiper*/
                loop={true}
                speed={5000}
                grabCursor={true}
                zoom={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                breakpoints={{
                    // Mobile (>= 320px)
                    320: {
                        slidesPerView: 2, // 1 slide visible
                        spaceBetween: 10, // Moins d'espace entre les slides
                    },
                    // Tablette (>= 640px)
                    640: {
                        slidesPerView: 4, // 2 slides visibles
                        spaceBetween: 15,
                    },
                    // Desktop (>= 1024px)
                    1024: {
                        slidesPerView: 5, // 3 slides visibles
                        spaceBetween: 20,
                    },
                    // Grand écran (>= 1440px)
                    1440: {
                        slidesPerView: 10, // 5 slides visibles
                        spaceBetween: 20,
                    },
                }}
            >
                {/* Slides */}
                {/*FIXE*/}
                {categoriesFixe.map((data, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="slide bg-gray-700 text-white flex items-center justify-center"
                            onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                            onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                        >
                            <div className="flex flex-col">
                                <FontAwesomeIcon size="xl" className="" icon={Icons[data.icon]} style={{color: data.color}} />
                                <h3 className="dark:text-gray-400 text-center mt-2 text-xs font-bold">{data.name}</h3>
                                <p className="text-center mt-1 text-sm">{calculateTotal(data.transactions)} €</p>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
                {/*OCCASIONNELLE*/}
                {categoriesOccasionnelle.map((data, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="slide bg-gray-700 text-white flex items-center justify-center"
                            onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                            onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                        >
                            <div className="flex flex-col">
                                <FontAwesomeIcon size="xl" className="" icon={Icons[data.icon]} style={{color: data.color}} />
                                <h3 className="dark:text-gray-400 text-center mt-2 text-xs font-bold">{data.name}</h3>
                                <p className="text-center mt-1 text-sm">{calculateTotalOccas([data])} €</p>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
                {/*REVENU*/}
                {categoriesRevenu.map((data, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="slide bg-gray-700 text-white flex items-center justify-center"
                            onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                            onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                        >
                            <div className="flex flex-col">
                                <FontAwesomeIcon size="xl" className="" icon={Icons[data.icon]} style={{color: data.color}} />
                                <h3 className="dark:text-gray-400 text-center mt-2 text-xs font-bold">{data.name}</h3>
                                <p className="text-center mt-1 text-sm">{calculateTotal(data.transactions)} €</p>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
            <style>
                {`
                    .swiper-container {
                        padding-bottom: 1px; /* Ajoute de l'espace sous le slider */
                        margin-left: 5px;
                        margin-right: 5px;
                    }
                    /*.swiper-pagination {
                        bottom: 16px !important; /!* Déplace la pagination 20px sous les slides *!/
                    }
                    .swiper-pagination-bullet {
                        background-color: #60A5FA; /!* Couleur par défaut des points *!/
                        opacity: 0.4; /!* Transparence par défaut *!/
                    }
                    .swiper-pagination-bullet-active {
                        background-color: #60A5FA; /!* Couleur du point actif *!/
                        opacity: 1; /!* Pleine opacité pour le point actif *!/
                    }
                    
                    /!* Conteneur de la barre de défilement *!/
                    .swiper-scrollbar {
                        height: 8px; /!* Taille de la barre de défilement *!/
                        background-color: #1F2937; /!* Couleur de fond *!/
                        border-radius: 4px; /!* Coins arrondis *!/
                        margin-top: 10px; /!* Espace entre la barre et le slider *!/
                        bottom: 0px !important;
                    }

                    /!* Partie glissante (dragable) *!/
                    .swiper-scrollbar-drag {
                        background-color: #60A5FA; /!* Couleur de la barre *!/
                        border-radius: 4px; /!* Coins arrondis *!/
                    }*/
                    
                    .slide {
                        height: 100px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        border-radius: 8px;
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }
                    .slide.hovered {
                        transform: scale(1.1); /* Agrandit légèrement l'élément */
                        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2); /* Ajoute une ombre pour l'effet */
                    }
                `}
            </style>
        </div>
    );
};

export default SwiperDashboard;
