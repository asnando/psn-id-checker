import React, { useState, useRef } from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import PageFooter from '../components/PageFooter';

const PAGE_TITLE = 'PSN ID availability';
const PAGE_DESCRIPTION = 'Easy Playstation Network ID availability checker.';
const API_BASE_URL = '/api';

function sendGASearchEvent(query) {
  if (typeof window.gtag === 'function') {
    gtag('send', 'event', 'Search', 'search', query);
  }
}

async function checkPSNIdAvaiability(id) {
  sendGASearchEvent(id);
  const response = await fetch(`${API_BASE_URL}?id=${id}`);
  const data = await response.json();
  const { available: isAvailable } = data;
  return isAvailable;
}

const Home = () => {
  const [isRequesting, setRequestingStatus] = useState(false);
  const [isWarningDialogVisible, setWarningDialogVisibility] = useState(false);
  const [isAvailableDialogVisible, setAvailableDialogVisibility] = useState(false);
  const [isUnavailableDialogVisible, setUnavailableDialogVisibility] = useState(false);
  const inputRef = useRef();

  function isEmptyString(str) {
    return !str.replace(/\s/g, '');
  }

  function getInputValue() {
    const {current: currentElement} = inputRef;
    return currentElement.value;
  }

  function setInputValue(value) {
    const {current: currentElement} = inputRef;
    currentElement.value = value;
  }

  function clearInput() {
    return setInputValue('');
  }

  function hasOpenDialogs() {
    return isWarningDialogVisible || isAvailableDialogVisible || isUnavailableDialogVisible;
  }

  async function handleFormSubmit() {
    if (isRequesting || hasOpenDialogs()) {
      return;
    }
    const currentId = getInputValue();
    if (isEmptyString(currentId)) {
      return showWarningDialog();
    }
    setRequestingStatus(true);
    const isAvailable = await checkPSNIdAvaiability(currentId);
    setRequestingStatus(false);
    if (isAvailable) {
      showAvailableDialog();
    } else {
      showUnavailableDialog();
    }
  }

  function showWarningDialog() {
    setWarningDialogVisibility(true);
  }
  function hideWarningDialog() {
    setWarningDialogVisibility(false);
  }
  function showAvailableDialog() {
    setAvailableDialogVisibility(true);
  }
  function hideSuccessSuccessDialog() {
    setAvailableDialogVisibility(false);
  }
  function showUnavailableDialog() {
    setUnavailableDialogVisibility(true);
  }
  function hideUnavailableDialog() {
    setUnavailableDialogVisibility(false);
  }

  function _renderMainBox() {
    return (
      <div className="nes-container with-title is-rounded is-dark is-centered">
        <br />
        <div className="nes-field">
          <label for="id">Enter a PSN id here</label>
          <input type="text" id="id" className="nes-input is-dark" ref={inputRef} />
        </div>
        <br />
        <button
          type="button"
          className={
            isRequesting || hasOpenDialogs()
            ? "nes-btn is-disabled"
            : "nes-btn is-warning"
          }
          onClick={handleFormSubmit}
        >
          Check
        </button>
      </div>
    );
  }

  function _renderWarningBox() {
    return isWarningDialogVisible && (
      <div className="nes-container is-rounded is-dark is-centered">
        <p>You must enter an id for checking...</p>
        <button type="button" className="nes-btn is-error" onClick={hideWarningDialog}>
          Got it!
        </button>
      </div>
    );
  }

  function _renderAvailableBox() {
    return isAvailableDialogVisible && (
      <div className="nes-container is-rounded is-dark is-centered">
        <i className="nes-icon trophy is-large" />
        <br />
        <p>You found an available id!</p>
        <button type="button" className="nes-btn is-success" onClick={hideSuccessSuccessDialog}>
          Oh yeah!
        </button>
      </div>
    );
  }

  function _renderUnavailableBox() {
    return isUnavailableDialogVisible && (
      <div className="nes-container is-rounded is-dark is-centered">
        <br />
        <p>This id is not available, sorry!</p>
        <button type="button" className="nes-btn is-error" onClick={hideUnavailableDialog}>
          Ok ):
        </button>
      </div>
    );
  }

  return (
    <>
      <main className="fullscreen is-center">
        <Head>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={PAGE_DESCRIPTION} />
        </Head>
        {_renderMainBox()}
        <br />
        {_renderWarningBox()}
        {_renderAvailableBox()}
        {_renderUnavailableBox()}
        <PageFooter />
      </main>
      <style jsx>{`
        .fullscreen {
          position: absolute;
          width: 100%;
          height: 100%;
          flex-direction: column;
        }
        .fullscreen.is-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default Home;
