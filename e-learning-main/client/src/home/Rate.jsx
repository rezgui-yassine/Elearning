import React from "react";
import { Container, Carousel } from "react-bootstrap";
import testimonial1 from "../components/Assets/imgs/testimonial-1.jpg";
import testimonial2 from "../components/Assets/imgs/ghada.jpeg";
import testimonial3 from "../components/Assets/imgs/saif.jpg";

function Rate() {
  return (
    <Container fluid className="py-5 wow fadeInUp" data-wow-delay="0.1s"

    id="paragraphe">
      <Container>
        <div className="text-center">
          <h6 className="px-3 text-center">
            Testimonial
          </h6>
          <h1 className="mb-5">Nos étudiants témoignent!</h1>
        </div>
        <Carousel className="testimonial-carousel position-relative">
          <Carousel.Item>
            <div className="text-center testimonial-item">
              <img
                className="p-2 mx-auto mb-3 border rounded-circle"
                src={testimonial1}
                style={{ width: "80px", height: "80px" }}
                alt="Client 1"
              />
              <h5 className="mb-0">Bassma melki</h5>
              <p>Profession</p>
              <div className="p-4 text-center testimonial-text bg-light">
                <p className="mb-0" >
                  En tant que professionnel dans le domaine du marketing
                  digital, l'utilisation de LinkHub a considérablement enrichi
                  ma compréhension et mes compétences. Les cours pertinents, les
                  ressources actualisées et la flexibilité d'apprentissage font
                  de LinkHub un outil inestimable pour rester à la pointe de mon
                  industrie. Mon expérience avec LinkHub a été plus qu'une
                  simple formation en ligne, c'était une opportunité de
                  croissance professionnelle continue.
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="text-center testimonial-item">
              <img
                className="p-2 mx-auto mb-3 border rounded-circle"
                src={testimonial2}
                style={{ width: "80px", height: "80px" }}
                alt="Client 1"
              />
              <h5 className="mb-0">Ghada Aydi</h5>
              <p>Etudiant</p>
              <div className="p-4 text-center testimonial-text bg-light">
                <p className="mb-0">
                  En tant qu'étudiante, LinkHub a été une bouée de sauvetage
                  pour mes études. Les cours interactifs, les ressources
                  pédagogiques diversifiées et la possibilité de suivre le
                  rythme à mon propre horaire ont considérablement amélioré ma
                  compréhension des sujets. LinkHub a transformé l'apprentissage
                  en une expérience engageante et accessible, ce qui a eu un
                  impact positif sur mes résultats académiques. Je suis
                  reconnaissante d'avoir une ressource aussi précieuse à portée
                  de clic.{" "}
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="text-center testimonial-item">
              <img
                className="p-2 mx-auto mb-3 border rounded-circle"
                src={testimonial3}
                style={{ width: "80px", height: "80px" }}
                alt="Client 1"
              />
              <h5 className="mb-0">Saif Mhamdi</h5>
              <p>développeur</p>
              <div className="p-4 text-center testimonial-text bg-light">
                <p className="mb-0">
                  LinkHub, c'est bien plus qu'une plateforme d'apprentissage en
                  ligne. Avec une expérience immersive et des cours de qualité,
                  LinkHub m'a permis d'explorer des domaines passionnants et de
                  développer mes compétences. Les contenus sont riches, les
                  instructeurs experts, et l'interface conviviale rend
                  l'apprentissage aussi plaisant qu'instructif. Je recommande
                  vivement LinkHub à tous les passionnés de l'apprentissage
                  continu.
                </p>
              </div>
            </div>
          </Carousel.Item>
          {/* Répétez le bloc Carousel.Item pour chaque témoignage supplémentaire */}
        </Carousel>
      </Container>
    </Container>
  );
}

export default Rate;
