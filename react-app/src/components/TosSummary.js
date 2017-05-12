import React from 'react';

const TosSummary = ({accepted, onTosChecked, onTosAccepted, onTosCanceled}) => (
  <div className="w-60-ns w-90 center">
    <h3 className="gma-orange">Gma Village Terms of Use - Summary</h3>
    <div>
      <p className="lh-copy f3">
        This is a summary of the Terms of Use agreement between Members and Gma Village. We encourage you to read the <a href="http://www.gmavillage.com/terms-of-use" target='_new'>entire contract</a> carefully and in its entirety. To the extent permitted and except where prohibited by applicable law, these Terms of Use include:
      </p>
      <ul>
        <li className="lh-copy f3">
          Your agreement that Gma Village is solely a venue to connect Parents and Grandmas for child care services, that Gma Village has no control over its Members and makes no promises about its Members (Section 1).
        </li>
        <li className="lh-copy f3">
          Your agreement that Gma Village does not provide or offer employment, that Members arrange for child care between themselves and that Grandmas act as independent contractors when providing child care services for Parents (Section 2).
        </li>
        <li className="lh-copy f3">
          Your agreement that you currently and will continue to meet the Eligibility Conditions (Section 3).
        </li>
        <li className="lh-copy f3">
          Your agreement that Gma Village can, but does not have to, verify the Eligibility Conditions of any member or conduct background checks on any member. It is your responsibility to conduct any appropriate screenings, verifications or background checks or to obtain references of any other Member (Section 4).
        </li>
        <li className="lh-copy f3">
          Your agreement to follow the rules regarding Member Content that you post using the site or services (Section 5).
        </li>
        <li className="lh-copy f3">
          Your agreement to follow the Gma Village Rules, which are provided to you with these Terms of Use (Section 5.3).
        </li>
        <li className="lh-copy f3">
          Your agreement that Gma Village may terminate your membership at any time. If your membership is terminated you must stop using the Gma Village Site and Services immediately (Section 6).
        </li>
        <li className="lh-copy f3">
          Your agreement that the Gma Village Site and Services are provided "as is" and without warranty (Section 14.1-2).
        </li>
        <li className="lh-copy f3">
          Your agreement to release Gma Village from liability based on claims relating to your use of the Site or Services, any dispute between you and another Member or any background or verification report (Section 14.3).
        </li>
        <li className="lh-copy f3">
          Your agreement that Gma Village’s liability is limited for damages relating to use of the Site or Services and that Gma Village has no liability for damages relating to your conduct or the conduct of anyone else in connection with use of the Site or Services (Section 14.4-5).
        </li>
        <li className="lh-copy f3">
          Your agreement to indemnify Gma Village from claims due to your use, misuse or inability to use the Site or Services, any materials and content you post through the Site, your violation of the Terms of Use or any rights of a third party, your interactions with or conduct towards any other Members, your violation of applicable laws, rules or regulations or information contained in any background or verification report (Section 15).
        </li>
      </ul>
      <div>
        <div className="checkbox mt4">
          <label>
            <input checked={accepted} type="checkbox" onClick={() => onTosChecked(!accepted)} />
            <span>I have read and accept the Gma Village <a href='http://www.gmavillage.com/terms-of-use' target='_new'>Terms of Service</a>.</span>
          </label>
        </div>
        <div className="mt4">
          <button onClick={onTosAccepted} className="btn gma-orange-bg mr3" disabled={!accepted}>Save and Continue</button>
          <a name="#cancel" onClick={onTosCanceled}>Cancel and Logout</a>
        </div>
      </div>
    </div>
  </div>
)

export default TosSummary;
