import { CANDIDATE_QUESTIONS } from '../data/candidates.js';

const GOV_LEVELS_CSS = `
.gov-levels {
  font-family: Arial, sans-serif;
  color: #222;
}
.gov-levels .level-row {
  display: grid;
  grid-template-columns: 1fr 210px 1fr;
  gap: 0 12px;
  align-items: stretch;
}
.gov-levels .block {
  padding: 16px 18px;
  border-radius: 8px;
}
.gov-levels .block h3 {
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .8px;
  margin-bottom: 8px;
}
.gov-levels .block ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.gov-levels .block ul li {
  font-size: 13.5px;
  line-height: 1.75;
  padding-left: 14px;
  position: relative;
}
.gov-levels .block ul li::before {
  content: "•";
  position: absolute;
  left: 0;
}
.gov-levels .fed-block { background: #FDEEEC; border: 2px solid #EB2E36; }
.gov-levels .fed-block h3 { color: #EB2E36; }
.gov-levels .fed-block ul li::before { color: #EB2E36; }
.gov-levels .prov-block { background: #F5E6E7; border: 2px solid #7A242F; }
.gov-levels .prov-block h3 { color: #7A242F; }
.gov-levels .prov-block ul li::before { color: #7A242F; }
.gov-levels .mun-block { background: #E8F3FA; border: 2px solid #3887B5; }
.gov-levels .mun-block h3 { color: #3887B5; }
.gov-levels .mun-block ul li::before { color: #3887B5; }
.gov-levels .centre-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.gov-levels .badge-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.gov-levels .logo-circle {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  margin-bottom: -18px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.18);
  flex-shrink: 0;
}
.gov-levels .fed-circle  { border-color: #EB2E36; }
.gov-levels .prov-circle { border-color: #7A242F; }
.gov-levels .mun-circle  { border-color: #3887B5; }
.gov-levels .badge {
  width: 100%;
  padding: 26px 10px 16px;
  text-align: center;
  border-radius: 8px;
  color: #fff;
  line-height: 1.3;
}
.gov-levels .badge .en-label { font-size: 20px; font-weight: 900; letter-spacing: 1px; }
.gov-levels .badge .fr-label { font-size: 14px; font-weight: 500; opacity: .85; margin-top: 2px; }
.gov-levels .fed-badge  { background: #EB2E36; }
.gov-levels .prov-badge { background: #7A242F; }
.gov-levels .mun-badge  { background: #3887B5; }
.gov-levels .arrow-row {
  display: grid;
  grid-template-columns: 1fr 210px 1fr;
  gap: 0 12px;
  height: 44px;
  align-items: center;
}
.gov-levels .arrow-centre { display: flex; justify-content: center; align-items: center; }
.gov-levels .arrow-bi { display: flex; flex-direction: column; align-items: center; }
.gov-levels .arrow-bi .head-up {
  width: 0; height: 0;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 13px solid #aaa;
}
.gov-levels .arrow-bi .shaft { width: 6px; height: 14px; background: #aaa; }
.gov-levels .arrow-bi .head-down {
  width: 0; height: 0;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-top: 13px solid #aaa;
}
.gov-levels .residents-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 28px;
}
.gov-levels .residents-label-row {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 10px;
}
.gov-levels .people-icons { display: flex; gap: 8px; align-items: flex-end; margin-bottom: 4px; }
.gov-levels .reps { border-top: 2px solid #ccc; padding-top: 24px; }
.gov-levels .reps-title {
  text-align: center;
  font-size: 15px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #333;
  margin-bottom: 20px;
}
.gov-levels .reps-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
}
.gov-levels .rep-card { border-radius: 8px; padding: 14px 16px; }
.gov-levels .fed-card  { background: #FDEEEC; border-top: 5px solid #EB2E36; }
.gov-levels .prov-card { background: #F5E6E7; border-top: 5px solid #7A242F; }
.gov-levels .mun-card  { background: #E8F3FA; border-top: 5px solid #3887B5; }
.gov-levels .rep-card h4 { font-size: 13px; font-weight: 800; margin-bottom: 10px; line-height: 1.5; color: #111; }
.gov-levels .rep-card ul { list-style: none; padding: 0; margin: 0; }
.gov-levels .rep-card ul li { font-size: 13px; line-height: 1.75; padding-left: 14px; position: relative; }
.gov-levels .rep-card ul li::before { content: "•"; position: absolute; left: 0; color: #888; }
.gov-levels .ward { font-weight: 700; }
.gov-levels .note { font-size: 11.5px; color: #888; margin-top: 8px; font-style: italic; }

@media (max-width: 640px) {
  .gov-levels .level-row,
  .gov-levels .arrow-row {
    grid-template-columns: 1fr;
  }
  .gov-levels .arrow-row { height: auto; }
  .gov-levels .centre-cell { padding: 12px 0 4px; }
  .gov-levels .reps-grid { grid-template-columns: 1fr; }
}
`;

const GOV_LEVELS_HTML = `
<div class="level-row">
  <div class="block fed-block">
    <h3>Federal (Canada)</h3>
    <ul>
      <li>Family policy</li>
      <li>Senior programs</li>
      <li>Poverty reduction</li>
      <li>Employment insurance</li>
      <li>Citizenship &amp; immigration</li>
      <li>National defence</li>
      <li>International relations</li>
    </ul>
  </div>
  <div class="centre-cell">
    <div class="badge-wrapper">
      <div class="logo-circle fed-circle" style="background:#fff; padding:5px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="119 0 27 13" style="width:100%;height:100%;display:block;">
          <path style="fill:#EB2D37" d="M137.9,1.2h5.2v10.4h-5.2V1.2z M128.9,6.4l-0.3,0.1c0,0,1.8,1.5,1.8,1.6c0.1,0.1,0.2,0.1,0.1,0.4 c-0.1,0.3-0.2,0.6-0.2,0.6s1.6-0.3,1.8-0.4c0.2,0,0.3,0,0.3,0.2c0,0.2-0.1,1.9-0.1,1.9h0.5c0,0-0.1-1.8-0.1-1.9 c0-0.2,0.1-0.2,0.3-0.2c0.2,0,1.8,0.4,1.8,0.4s-0.1-0.4-0.2-0.6c-0.1-0.3,0-0.3,0.1-0.4c0.1-0.1,1.8-1.6,1.8-1.6l-0.3-0.1 c-0.2-0.1-0.1-0.2-0.1-0.3s0.3-1.1,0.3-1.1s-0.8,0.2-0.9,0.2c-0.1,0-0.2,0-0.2-0.1s-0.2-0.5-0.2-0.5s-0.9,1-1,1.1 c-0.2,0.2-0.4,0-0.3-0.2c0-0.2,0.5-2.3,0.5-2.3s-0.5,0.3-0.7,0.4s-0.3,0.1-0.3-0.1c-0.1-0.2-0.7-1.3-0.7-1.4c0,0-0.6,1.2-0.7,1.4 s-0.2,0.2-0.3,0.1c-0.2-0.1-0.7-0.4-0.7-0.4s0.5,2.1,0.5,2.3s-0.1,0.3-0.3,0.2l-1-1.1c0,0-0.1,0.3-0.2,0.4c0,0.1-0.1,0.2-0.2,0.1 c-0.2,0-1-0.2-1-0.2s0.3,1,0.4,1.1C129.1,6.1,129.1,6.3,128.9,6.4z M122.2,1.2h5.2v10.4h-5.2V1.2z"></path>
        </svg>
      </div>
      <div class="badge fed-badge">
        <div class="en-label">Federal</div>
        <div class="fr-label">Fédéral</div>
      </div>
    </div>
  </div>
  <div class="block fed-block">
    <h3>Fédéral (Canada)</h3>
    <ul>
      <li>Politique familiale</li>
      <li>Programmes pour les aînés</li>
      <li>Réduction de la pauvreté</li>
      <li>Assurance-emploi</li>
      <li>Citoyenneté et immigration</li>
      <li>Défense nationale</li>
      <li>Relations internationales</li>
    </ul>
  </div>
</div>

<div class="arrow-row">
  <div></div>
  <div class="arrow-centre">
    <div class="arrow-bi">
      <div class="head-up"></div><div class="shaft"></div><div class="head-down"></div>
    </div>
  </div>
  <div></div>
</div>

<div class="level-row">
  <div class="block prov-block">
    <h3>Provincial (NB)</h3>
    <ul>
      <li>Education</li>
      <li>Health care</li>
      <li>Social assistance</li>
      <li>Housing</li>
      <li>Nursing homes</li>
    </ul>
  </div>
  <div class="centre-cell">
    <div class="badge-wrapper">
      <div class="logo-circle prov-circle" style="background:#fff; padding:11px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.33 70.88" style="width:100%;height:100%;display:block;">
          <path style="fill:#0069aa" d="M30.43,60.37c-11.91,.51-28.48,9.26-28.48,9.26,0,0,9.14-4.1,19.23-5.56-.85,.94-1.26,1.96-1.06,2.93,.51,2.46,5.84,3.99,10.49,3.03,1.33-.28,2.52-.8,3.63-1.22-.96,.37-8.63-.02-8.48-2.95,.11-2.22,5.15-3.36,8.87-2.01,3.09,1.11,5.35,5.15,4.53,6.93,.18-.25,.33-.52,.47-.81,1.41-3.07,.21-10-9.2-9.6Z"></path>
          <path style="fill:#0069aa" d="M68.71,63.09c-.48-2.47-4.64-3.74-9.3-2.85-1.98,.38-3.75,1.22-5.13,2.01-3.24,1.86-7.9,5.93-7.9,5.93,1.12-.79,2.55-1.54,4.06-2.25,1.96-.91,11.07-4.5,12.16-1.41,.49,1.38-1.24,3.27-5.91,3.87-1.25,.16-2.87,.09-3.73-.34,1.64,1.27,4.77,1.77,8.16,1.12,4.66-.89,8.06-3.62,7.59-6.08Z"></path>
          <path style="fill:#8b0e04" d="M0,68.73s37.37-19.53,55.89-16.67c-7.25,10.88-15.39,18.82-15.39,18.82,11.75-7.87,18.94-15.97,23.26-23.44C40.47,38.2,0,68.73,0,68.73Z"></path>
          <path style="fill:#8b0e04" d="M67.94,16.93s-3.83-5.05-12.86-8.64c-.48-3.14-1.28-5.87-2.19-8.29,.49,2.14,.58,5.21,.37,7.61-5.5-1.91-12.69-3.21-21.83-2.73,0,0,19.62,9.17-20.13,52.29,0,0,32.55-22.32,43.39-19.42,0,0,4.66,.65,9.43,8.68,8.79-16.47,3.83-29.51,3.83-29.51Zm-5.23,22.89c-3.76-5.87-8.03-6.85-8.03-6.85-10.83-2.89-28.38,11.71-28.38,11.71,23.3-27.84,14.96-35.61,14.96-35.61,17.61,0,24.75,9.28,24.75,9.28,2.19,6.78-.31,14.49-3.31,21.46Z"></path>
          <path style="fill:#8b0e04" d="M51.31,.82c-10.3-1.48-15.94,1.63-16.59,2,10.77,.3,12.9,1.44,16.69,2.41,.26-1.44-.1-4.41-.1-4.41Z"></path>
        </svg>
      </div>
      <div class="badge prov-badge">
        <div class="en-label">Provincial</div>
        <div class="fr-label">Provincial</div>
      </div>
    </div>
  </div>
  <div class="block prov-block">
    <h3>Provincial (N.-B.)</h3>
    <ul>
      <li>Éducation</li>
      <li>Soins de santé</li>
      <li>Aide sociale</li>
      <li>Logement</li>
      <li>Foyers de soins</li>
    </ul>
  </div>
</div>

<div class="arrow-row">
  <div></div>
  <div class="arrow-centre">
    <div class="arrow-bi">
      <div class="head-up"></div><div class="shaft"></div><div class="head-down"></div>
    </div>
  </div>
  <div></div>
</div>

<div class="level-row">
  <div class="block mun-block">
    <h3>Municipal (Moncton)</h3>
    <ul>
      <li>Police and fire services</li>
      <li>Drinking water</li>
      <li>Public transit</li>
      <li>Recreation</li>
      <li>Zoning (land use)</li>
      <li>Waste collection</li>
    </ul>
  </div>
  <div class="centre-cell">
    <div class="badge-wrapper">
      <div class="logo-circle mun-circle" style="background:#fff; padding:6px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 177" style="width:100%;height:100%;display:block;">
          <path d="M.89,138c-1.73-1.07-.67-2.19.76-1.81,2.08.57,12.42,2.3,20.54,1.19,36.78-2.81,58.83-34.81,90.6-25.77,9.37,2.39,13.22,8.05,13.8,11.8,2.61,17.13-19.07,15.31-19.92,27.14-1.25,14.95,21.3,22.81,23.63,23.54,2.65.84,1.89,2.76-.48,2.25-2.74-.62-27.84-4.39-33.5-18.25-3.6-7.58-.76-17.62,6.74-23.71,2.85-2.24,5.2-5.47,2.05-8.58-8.5-8.41-39.56,11.9-49.81,15.03-14.25,5.57-36.5,6.33-54.4-2.84Z" style="fill:#ef3340;"></path>
          <path d="M236.77,163.96c.65,1.92-.88,2.12-1.73.91-1.24-1.76-8.13-9.67-15.1-13.97-30.19-21.2-67.54-10.51-86.33-37.67-5.71-7.8-5.09-14.62-3.16-17.87,8.87-14.88,24.45.3,32.63-8.3,10.47-10.74-1.96-31.15-3.29-33.2-1.52-2.33.3-3.33,1.8-1.43,1.72,2.22,18.71,21.08,14.28,35.38-2.04,8.14-10.61,14.09-20.27,14.03-3.62-.08-7.49.92-7.04,5.32,1.22,11.89,38.11,15.95,48.01,20.05,14.55,4.75,32.2,18.31,40.2,36.76Z" style="fill:#84bd00;"></path>
          <path d="M173.54.07c1.99-.41,1.99,1.14.69,1.83-1.9,1.02-10.61,6.85-15.75,13.24-24.81,27.31-18.86,65.7-48.16,80.95-8.45,4.7-15.14,3.23-18.13.9-13.66-10.66,3.35-24.22-4.16-33.41-9.35-11.73-31.15-1.95-33.35-.88-2.5,1.21-3.27-.71-1.2-1.96,2.42-1.43,23.25-15.93,36.88-9.75,7.82,3.04,12.65,12.29,11.39,21.86-.54,3.58-.02,7.54,4.4,7.65,11.95.28,20.58-35.82,25.89-45.13,6.53-13.84,22.19-29.67,41.49-35.29Z" style="fill:#0095c8;"></path>
        </svg>
      </div>
      <div class="badge mun-badge">
        <div class="en-label">Municipal</div>
        <div class="fr-label">Municipal</div>
      </div>
    </div>
  </div>
  <div class="block mun-block">
    <h3>Municipal (Moncton)</h3>
    <ul>
      <li>Services de police et d'incendie</li>
      <li>Eau potable</li>
      <li>Transport en commun</li>
      <li>Loisirs</li>
      <li>Zonage (aménagement du territoire)</li>
      <li>Collecte des déchets</li>
    </ul>
  </div>
</div>

<div class="arrow-row">
  <div></div>
  <div class="arrow-centre">
    <div class="arrow-bi">
      <div class="head-up"></div><div class="shaft"></div><div class="head-down"></div>
    </div>
  </div>
  <div></div>
</div>

<div class="residents-section">
  <div class="people-icons">
    <svg width="28" height="44" viewBox="0 0 28 44" fill="#888"><circle cx="14" cy="10" r="7"></circle><path d="M4 42 Q4 24 14 24 Q24 24 24 42Z"></path></svg>
    <svg width="34" height="50" viewBox="0 0 34 50" fill="#555"><circle cx="17" cy="11" r="9"></circle><path d="M4 48 Q4 26 17 26 Q30 26 30 48Z"></path></svg>
    <svg width="22" height="36" viewBox="0 0 22 36" fill="#888"><circle cx="11" cy="8" r="6"></circle><path d="M3 34 Q3 19 11 19 Q19 19 19 34Z"></path></svg>
    <svg width="28" height="44" viewBox="0 0 28 44" fill="#888"><circle cx="14" cy="10" r="7"></circle><path d="M4 42 Q4 24 14 24 Q24 24 24 42Z"></path></svg>
  </div>
  <div class="residents-label-row">Residents &nbsp;/&nbsp; Résidants</div>
  <div style="font-size:12px; color:#888; text-align:center; max-width:340px;">
    All levels of government ultimately serve the residents of Moncton.<br>
    Tous les niveaux de gouvernement servent les résidants de Moncton.
  </div>
</div>

<div class="reps">
  <p class="reps-title">Your Representatives &nbsp;/&nbsp; Vos Représentants</p>
  <div class="reps-grid">
    <div class="rep-card fed-card">
      <h4>Member of Parliament<br><em style="font-weight:400">Membre du Parlement</em><br>(Federal / Fédéral)</h4>
      <ul><li>Ginette Petitpas Taylor</li></ul>
    </div>
    <div class="rep-card prov-card">
      <h4>Members of the Legislative Assembly<br><em style="font-weight:400">Membres de l'Assemblée législative</em><br>(Provincial / N.-B.)</h4>
      <ul>
        <li>Claire Johnson <span style="color:#777">(Moncton South)</span></li>
        <li>Tania Sodhi <span style="color:#777">(Moncton Northwest)</span></li>
        <li>Alexandre Cédric Doucet <span style="color:#777">(Moncton East)</span></li>
        <li>Rob McKee <span style="color:#777">(Moncton Centre)</span></li>
        <li>Lyne Chantal Boudreau <span style="color:#777">(Champdoré-Irishtown)</span></li>
      </ul>
    </div>
    <div class="rep-card mun-card">
      <h4>Moncton City Council<br><em style="font-weight:400">Conseil municipal de Moncton</em></h4>
      <ul>
        <li><span class="ward">Acting Mayor:</span> Paulette Theriault</li>
        <li><span class="ward">At Large:</span> Monique LeBlanc, Marty Kingston</li>
        <li><span class="ward">Ward 1:</span> Paulette Theriault &amp; Shawn Crossman</li>
        <li><span class="ward">Ward 2:</span> Charles Leger &amp; Daniel Bourgeois</li>
        <li><span class="ward">Ward 3:</span> Bryan Butler &amp; Dave Steeves</li>
        <li><span class="ward">Ward 4:</span> Susan Edgett &amp; Paul Richard</li>
      </ul>
      <p class="note">These represent the <strong>previous term</strong> of council. A new council will be elected on <strong>May 11, 2026</strong>.</p>
    </div>
  </div>
</div>
`;

export default function Platforms() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Candidate Platforms</h1>
          <p>Where the candidates stand on the issues that matter most to Moncton.</p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--colour-grey-700)', marginBottom: 'var(--space-8)', lineHeight: 1.7 }}>
          Candidates were asked to answer the following questions. Their responses will be posted the week of April 28th.
        </p>

        <ol style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', paddingLeft: 0, listStyle: 'none' }}>
          {CANDIDATE_QUESTIONS.map((question, i) => (
            <li key={i} className="card" style={{ padding: 'var(--space-5) var(--space-6)', display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
              <span style={{
                flexShrink: 0,
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--colour-primary-600)',
                paddingTop: '2px',
                minWidth: '2rem',
              }}>
                Q{i + 1}
              </span>
              <span style={{ fontSize: 'var(--text-base)', color: '#1E2D3D', lineHeight: 1.6 }}>
                {question}
              </span>
            </li>
          ))}
        </ol>

        {/* Levels of Government */}
        <div style={{ marginTop: 'var(--space-16)', borderTop: '2px solid var(--colour-grey-200)', paddingTop: 'var(--space-12)' }}>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#1E2D3D', marginBottom: 'var(--space-4)' }}>
            Not sure what a city councillor actually controls?
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--colour-grey-700)', lineHeight: 1.8, marginBottom: 'var(--space-8)', maxWidth: '680px' }}>
            When people say they're frustrated with "the government," they usually mean all three levels at once — but those levels don't control the same things. Your city councillor has no say over healthcare wait times or employment insurance. Your MP can't fill a pothole or change the bus schedule. Each level of government has its own lane. The chart below shows who's responsible for what, so you know which questions are actually fair to ask a municipal candidate.
          </p>

          <div className="gov-levels">
            <style>{GOV_LEVELS_CSS}</style>
            <div dangerouslySetInnerHTML={{ __html: GOV_LEVELS_HTML }} />
          </div>
        </div>
      </div>
    </>
  );
}
