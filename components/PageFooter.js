import React from 'react';

const PageFooter = ({ devName, devGithubLink, repoGithubLink }) => (
  <div className="footer nes-container is-dark">
    <span>
      Developed by
      <a className="dev-link" target="_blank" href={devGithubLink}>{devName}</a>
      <a className="nes-icon is-medium star" target="_blank" href={repoGithubLink}></a>
    </span>
    <style jsx>{`
      .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 7em;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      span {
        display: flex;
        align-items: flex-end;
      }
      .dev-link {
        margin: 0 .75em;
      }
      .dev-link:hover {
        opacity: .8;
      }
      .star {
        opacity: .6;
        text-align: center;
        display: flex;
        justify-content: center;
        margin-left: .25em;
      }
      .star::before {
        animation: float-star 2s infinite linear;
      }
      .star::after {
        content: " ";
        position: absolute;
        bottom: -.3em;
        height: .25em;
        width: 100%;
        background-color: #151515;
        border-radius: 100%;
        animation: float-shadow 2s infinite linear;
      }
      .star:hover {
        opacity: 1;
      }
      @keyframes float-shadow {
        from {
          transform: translateY(0) scale(.75);
        }
        50% {
          transform: translateY(.055em) scale(1);
        }
        to {
          transform: translateY(0) scale(.75);
        }
      }
      @keyframes float-star {
        from {
          margin-top: 0;
        }
        50% {
          margin-top: -.15em;
        }
        to {
          margin-top: 0;
        }
      }
    `}</style>
  </div>
);

PageFooter.defaultProps = {
  devName: 'ffrm',
  devGithubLink: 'https://github.com/ffrm',
  repoGithubLink: 'https://github.com/ffrm/psn-id-checker',
};

export default PageFooter;