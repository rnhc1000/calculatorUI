import Footer from '../../components/Footer';
import HeaderUser from '../../components/HeaderUser';
import { RecordData } from '../../components/RecordData';
import { StrictMode } from 'react';
import { Fade } from 'react-awesome-reveal';

export default function Records() {
   return (
      <>

         <HeaderUser />
         <Fade>
            <StrictMode>

               <RecordData />

            </StrictMode>
         </Fade>
         <Footer />

      </>

   )
}