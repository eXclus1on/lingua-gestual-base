import React from 'react';
import "../theme/Styles.css"

export const PageFooter = () => {
  //const history = useHistory();

  const redirectToTermsPage = () => {
    //history.push('/TermsOfUsePage');
  };

  return (
    <footer className="footer" onClick={redirectToTermsPage}>
      Termos e Condições
    </footer>
  );
};

export default PageFooter;
