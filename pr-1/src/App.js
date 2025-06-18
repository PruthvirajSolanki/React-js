import React from 'react';
import UserProfileCard from './components/UserProfileCard';
import pruthvi from "./assests/images-1.jpg"
import savan from "./assests/images-2.jpg"
import heney from "./assests/images-3.jpg"
import resha from "./assests/images-4.jpg"
import vishal from "./assests/images-5.jpg"
import khushal from "./assests/images-6.jpg"

   

function App() {
  return (
    <div class="row">
      <UserProfileCard 
        UserId="5942"
        name="Pruthvi Solanki"
        gender="Male"
        dob="20-05-2005"
        address="58, Sanskar Villa Society, Surat"
        Nationality="Indian"
        photo={pruthvi}
      />

      <UserProfileCard 
        UserId="6814"
        name="Savan Panchani"
        gender="Male"
        dob="17-09-2006"
        address="203, Navkar Palace, Ahemdabad"
        Nationality="Muslim"
        photo={savan}
      />

      <UserProfileCard 
        UserId="4333"
        name="Heney Goyani"
        gender="Female"
        dob="15-01-2006"
        address="304, Sankalp Recidency, Surat"
        Nationality="Indian"
        photo={heney}
      />

      <UserProfileCard 
        UserId="4351"
        name="Resha Nakrani"
        gender="Female"
        dob="12-06-1999"
        address="903, Shivanta Palce, Dubai"
        Nationality="Islamic"
        photo={resha}
      />

      <UserProfileCard 
        UserId="6000"
        name="Vishal Solanki"
        gender="Female"
        dob="22-12-2000"
        address="105, Shiv Nagar, kazakistan"
        Nationality="Arabic"
        photo={vishal}
      />

      <UserProfileCard 
        UserId="5689"
        name="Khus Vaghasiya"
        gender="Male"
        dob="25-08-2010"
        address="304, Royal Plaza, Ahemdabad"
        Nationality="Indian"
        photo={khushal}
      />


       <UserProfileCard 
        UserId="9084"
        name="Henil Rakholiya"
        gender="Male"
        dob="09-06-1995"
        address="90, laskana society, Amreliiii"
        Nationality="Indian"
        photo={savan}
      />

       <UserProfileCard 
        UserId="5689"
        name="Sahil Savaliya"
        gender="Male"
        dob="11-11-2005"
        address="204, Anand Dhara Soc, Surat"
        Nationality="Indian"
        photo={pruthvi}
      />
    </div>
  );
}

export default App;






