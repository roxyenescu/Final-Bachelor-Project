import React from 'react';
import '../styles/Home.css';
import adapost1 from '../images/adapost1.jpg';
import adapost2 from '../images/adapost2.jpg';
import adapost3 from '../images/adapost3.jpeg';
import adapost4 from '../images/adapost4.jpg';
import adapost5 from '../images/adapost5.jpg';
import adapost6 from '../images/adapost6.jpg';

function HomePage() {
  return (

    <div className='homepage-container'>
      <h1 className='homepage-title'>Bun venit la Adăpostul nostru AnimalsCare!</h1>

      <img src={adapost1} alt="AnimalsCare" className="adapost1" />
      <p className='homepage-paragraph'>
        Într-o lume în care compasiunea și iubirea pentru animalele neîndrăgite își găsesc locul,
        suntem mândri să vă întâmpinăm pe site-ul nostru. Aici, ne-am propus să creăm o punte între
        sufletele animalelor nevoiașe și inimile dornice de a oferi căldură și îngrijire.
      </p>

      <img src={adapost2} alt="AnimalsCare" className="adapost2" />
      <p className='homepage-paragraph'>
        Misiunea noastră este să găsim familii iubitoare și permanente pentru fiecare animal pe care
        îl adăpostim. Fiecare creatură din grija noastră este specială și unică, așteptându-și șansa
        de a fi parte dintr-un cămin fericit.
      </p>

      <img src={adapost3} alt="AnimalsCare" className="adapost1" />
      <p className='homepage-paragraph'>
        Pe acest site veți găsi informații detaliate despre animalele noastre disponibile pentru adopție,
        inclusiv fotografii, descrieri și informații medicale relevante. Ne asigurăm că fiecare animal
        este îngrijit corespunzător, cu respect pentru nevoile sale specifice și cu sprijinul veterinarilor
        noștri dedicați.
      </p>

      <img src={adapost4} alt="AnimalsCare" className="adapost2" />
      <p className='homepage-paragraph'>
        De asemenea, suntem recunoscători pentru orice formă de sprijin pe care sunteți dispuși să o oferiți.
        Donațiile și voluntariatul sunt esențiale pentru a ne ajuta să continuăm să oferim îngrijire și dragoste
        animalelor fără adăpost.
      </p>

      <img src={adapost5} alt="AnimalsCare" className="adapost1" />
      <p className='homepage-paragraph'>
        Vă invităm să explorați site-ul nostru și să începeți călătoria dumneavoastră spre a găsi un nou prieten de nădejde.
        Împreună, putem face o diferență semnificativă în viețile animalelor și în lumea în care trăim.
      </p>

      <img src={adapost6} alt="AnimalsCare" className="adapost2" />
      <p className='homepage-paragraph'>
        Vă mulțumim că ați ales să vizitați site-ul nostru și că sunteți deschiși să oferiți un cămin iubitor
        unui animal de companie. Pentru noi, adopția nu este doar o tranzacție, ci o responsabilitate pe viață.
        Fiecare adopție este o poveste de succes și suntem onorați să facem parte din
        această călătorie cu dumneavoastră!
      </p>

      <h2 className='homepage-title'>
        Cu dragoste și recunoștință,
        Echipa Adăpostului AnimalsCare
      </h2>
    </div>

  );
}

export default HomePage;
