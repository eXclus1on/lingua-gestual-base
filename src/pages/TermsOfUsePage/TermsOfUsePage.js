import React from "react";
import "./TermsOfUsePage.css";

const TermsOfUsePage = () => {
  return (
    <div className="terms-container">
      <div className="logo-container">
        <img src="../../images/ivling.png" alt="Logo" />
      </div>

      <div className="terms-content">
        <h2>Termos de Utilização</h2>
        <p>
          Bem-vindo ao "Empresa"! Ao acessar e utilizar este site,
          você concorda com os seguintes termos de uso. Por favor, leia
          atentamente antes de continuar.
        </p>

        <p>
          Aceitação dos Termos: Ao acessar ou usar este site de qualquer forma,
          você concorda em cumprir estes Termos de Utilização. Se você não
          concorda com todos os termos e condições deste acordo, por favor, não
          use este site. Uso Permitido: Este site destina-se apenas a fins
          informativos e de comunicação. Você concorda em não usar este site
          para qualquer finalidade ilegal ou não autorizada. Conteúdo do
          Usuário: Ao enviar qualquer conteúdo para o site, você concede a
          "Empresa" o direito não exclusivo, transferível, sublicenciável, livre
          de royalties, de usar, armazenar, reproduzir, modificar, criar
          trabalhos derivados, distribuir e exibir esse conteúdo. Privacidade:
          Seus dados pessoais serão tratados de acordo com nossa Política de
          Privacidade. Ao usar este site, você concorda com a coleta e uso de
          informações conforme estabelecido na política de privacidade. Links
          para Terceiros: Podemos incluir links para sites de terceiros. Não
          somos responsáveis pelo conteúdo desses sites, e seu uso está sujeito
          aos termos de uso desses sites. Alterações nos Termos: Reservamo-nos o
          direito de modificar estes Termos de Utilização a qualquer momento. O
          uso contínuo do site após tais alterações constitui sua aceitação dos
          termos modificados. Encerramento de Acesso: Podemos encerrar ou
          suspender seu acesso ao site a qualquer momento, por qualquer motivo,
          sem aviso prévio. Lei Aplicável: Estes Termos de Utilização são
          regidos e interpretados de acordo com as leis de Portugal, sem
          consideração aos seus conflitos de disposições legais.
        </p>

        <p>
          Se você tiver alguma dúvida ou preocupação sobre estes Termos de
          Utilização, entre em contato conosco.
        </p>
      </div>

      <div className="back-button-container">
        <button onClick={() => (window.location.href = "/login")}>
          Voltar para Login
        </button>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
