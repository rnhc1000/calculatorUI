import Footer from '../../components/Footer';
import HeaderUser from '../../components/HeaderUser';
import { RecordData } from '../../components/RecordData';
import { StrictMode } from 'react';

export default function Records() {
   return (
      <>

         <HeaderUser />

         <StrictMode>

            <RecordData />

         </StrictMode>

         <Footer />

      </>

   )
}