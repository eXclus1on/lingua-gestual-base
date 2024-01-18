import React from "react";
import "./TermsOfUsePage.css";
import logo from "../../images/ivling.png";
import { Link } from "react-router-dom";

const TermsOfUsePage = () => {
  return (
    <div className="terms-container">
      <div className="top-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="terms-content">
        <h2 className="titulo">
          <b>Termos de Utilização</b>
        </h2>
        <p>
          Bem-vindo ao <b>"Empresa"</b>! Ao acessar e utilizar este site, você
          concorda com os seguintes termos de uso. Por favor, leia atentamente
          antes de continuar.
        </p>
        <p>
          <b>Aceitação dos Termos: </b>
          Ao acessar ou usar este site de qualquer forma, você concorda em
          cumprir estes Termos de Utilização. Se você não concorda com todos os
          termos e condições deste acordo, por favor, não use este site.
          <br></br>
          <b>Uso Permitido: </b>Este site destina-se apenas a fins informativos
          e de comunicação. Você concorda em não usar este site para qualquer
          finalidade ilegal ou não autorizada.
          <br></br>
          <b>Conteúdo do Usuário:</b> Ao enviar qualquer conteúdo para o site,
          você concede a <b>"Empresa"</b> o direito não exclusivo, transferível,
          sublicenciável, livre de royalties, de usar, armazenar, reproduzir,
          modificar, criar trabalhos derivados, distribuir e exibir esse
          conteúdo.
          <br></br>
          <b>Privacidade: </b>
          Seus dados pessoais serão tratados de acordo com nossa Política de
          Privacidade. Ao usar este site, você concorda com a coleta e uso de
          informações conforme estabelecido na política de privacidade.
          <br></br>
          <b>Links para Terceiros :</b>
          Podemos incluir links para sites de terceiros. Não somos responsáveis
          pelo conteúdo desses sites, e seu uso está sujeito aos termos de uso
          desses sites.
          <br></br>
          <b>Alterações nos Termos: </b>
          Reservamo-nos o direito de modificar estes Termos de Utilização a
          qualquer momento. O uso contínuo do site após tais alterações
          constitui sua aceitação dos termos modificados.
          <br></br>
          <b>Encerramento de Acesso: </b>
          Podemos encerrar ou suspender seu acesso ao site a qualquer momento,
          por qualquer motivo, sem aviso prévio. Lei Aplicável: Estes Termos de
          Utilização são regidos e interpretados de acordo com as leis de
          Portugal, sem consideração aos seus conflitos de disposições legais.
        </p>
        <p>
          Se você tiver alguma dúvida ou preocupação sobre estes Termos de
          Utilização, entre em contato conosco.
        </p>
      </div>
      <Link to="/login">
        <button className="button-container">VOLTAR</button>
      </Link>
    </div>
  );
};

export default TermsOfUsePage;
