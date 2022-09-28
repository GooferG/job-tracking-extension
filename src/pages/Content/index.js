// import { printLine } from './modules/print';

// console.log('Content script works!');
// console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine' function from the Print Module");

const getLinkedInInfo = () => {
  const companyName =
    document.querySelector(".jobs-unified-top-card__company-name a")
      ?.innerText ?? "NA";

  const positionTitle =
    document.querySelector(".jobs-unified-top-card__job-title")?.innerText ??
    "NA";

  const websiteUrl =
    document.querySelector(".jobs-unified-top-card__company-name a")?.href ??
    "NA";

  const workplaceType =
    document.querySelector(".jobs-unified-top-card__workplace-type")
      ?.innerText ?? "NA";

  const jobSchedule =
    document.querySelector(
      "ul > .jobs-unified-top-card__job-insight:nth-child(1) > span"
    )?.innerText ?? "NA";

  const companySize =
    document
      .querySelector(
        "ul > .jobs-unified-top-card__job-insight:nth-child(2) > span"
      )
      ?.innerText?.split("·")?.[0] ?? "NA";

  const salary = document.querySelector("a[href='#SALARY']")?.innerText ?? "NA";

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let jobId = params.currentJobId;
  const jobLink = `https://www.linkedin.com/jobs/view/${jobId}/`;

  const source = "LinkedIn";

  var logoSrc =
    document.querySelector(".jobs-search-results-list__list-item--active img")
      ?.src ?? "NA";

  return {
    companyName,
    positionTitle,
    companySize,
    websiteUrl,
    workplaceType,
    source,
    jobSchedule,
    salary,
    jobLink,
    logoSrc,
  };
};

// ###########################################################
// ###################### GOOGLE #############################
// ###########################################################

const getGoogleJobsInfo = () => {
  const companyName =
    document.querySelector(".whazf div.nJlQNd.sMzDkb")?.textContent ?? "NA";

  const positionTitle =
    document.querySelector(".whazf .KLsYvd")?.innerText ?? "NA";

  const websiteUrl =
    document.querySelector(".whazf .pMhGee.Co68jc.j0vryd")?.href ?? "NA";

  // const workplaceType = document.querySelector("")?.textContent ?? "NA";

  // const jobSchedule = document.querySelector("")?.textContent ?? "NA";

  // const companySize = document.querySelector("")?.innerText ?? "NA";

  // const salary =
  //   document.querySelector(".job-search-key-1hbqxax.e1wijj240")?.textContent ??
  //   "NA";
  // const salary = document.querySelector(".IiQJ2c")?.textContent ?? "NA";

  const jobLink = websiteUrl;

  const source = "GoogleJobs";

  const logoSrc = document.querySelector(".YQ4gaf.zr758c")?.src ?? "NA";

  return {
    companyName,
    positionTitle,
    companySize: "NA",
    websiteUrl,
    workplaceType: "NA",
    source,
    jobSchedule: "NA",
    salary: "NA",
    jobLink,
    logoSrc,
  };
};

// ###########################################################
// ###################### INDEED #############################
// ###########################################################

const getIndeedInfo = () => {
  const companyName = document.querySelector(".companyName")?.innerText ?? "NA";

  const positionTitle =
    document.querySelector(".jcs-JobTitle span")?.innerText ?? "NA";

  const websiteUrl = document.querySelector(".jobTitle a")?.href ?? "NA";

  const workplaceType =
    document.querySelector(".metadata:nth-child(2) > .attribute_snippet")
      ?.textContent ?? "NA";

  const jobSchedule =
    document.querySelector(".metadata:nth-child(3) > .attribute_snippet")
      ?.textContent ?? "NA";

  const companySize =
    document
      .querySelector(
        "ul > .jobs-unified-top-card__job-insight:nth-child(2) > span"
      )
      ?.innerText?.split("·")?.[0] ?? "NA";

  const salary =
    document.querySelector(".metadata:nth-child(1) > .attribute_snippet")
      ?.textContent ?? "NA";

  const jobLink = websiteUrl;

  const source = "Indeed";

  const logoSrc = document.querySelector(".gnav-Logo-icon svg")?.src ?? "NA";

  return {
    companyName,
    positionTitle,
    companySize,
    websiteUrl,
    workplaceType,
    source,
    jobSchedule,
    salary,
    jobLink,
    logoSrc,
  };
};

// ###########################################################
// ###################### GLASSDOOR ##########################
// ###########################################################

const getGlassdoorInfo = () => {
  const companyName =
    document.querySelector(".css-xuk5ye.e1tk4kwz5")?.childNodes?.[0]?.data ??
    "NA";

  const positionTitle =
    document.querySelector(".css-1j389vi.e1tk4kwz2")?.innerText ?? "NA";

  const websiteUrl = document.querySelector("#EmpBasicInfo a")?.href ?? "NA";

  // const workplaceType = document.querySelector("")?.textContent ?? "NA";

  // const jobSchedule = document.querySelector("")?.textContent ?? "NA";

  const companySize =
    document.querySelector(
      ".d-flex.justify-content-start.css-daag8o.e1pvx6aw2:nth-child(1) > span:nth-child(2)"
    )?.innerText ?? "NA";

  const salary =
    document.querySelector(".css-1hbqxax.e1wijj240")?.textContent ?? "NA";

  const jobLink = websiteUrl;

  const source = "Glassdoor";

  const logoSrc =
    document.querySelector(".css-bkasv9.eigr9kq0 img")?.src ?? "NA";

  return {
    companyName,
    positionTitle,
    companySize,
    websiteUrl,
    workplaceType: "NA",
    source,
    jobSchedule: "NA",
    salary,
    jobLink,
    logoSrc,
  };
};

// ###########################################################
// ######################## DICE #############################
// ###########################################################

const getDiceInfo = () => {
  const companyName =
    document.querySelector("#hiringOrganizationName")?.textContent ?? "NA";

  const positionTitle =
    document.querySelector("h1.jobTitle")?.innerText ?? "NA";

  const websiteUrl =
    document.querySelector(".employer.hiringOrganization a")?.href ?? "NA";

  // const workplaceType = document.querySelector("")?.textContent ?? "NA";

  // const jobSchedule =
  //   document.querySelector(".card-position-type.margin-right-20")
  //     ?.textContent ?? "NA";

  // const companySize = document.querySelector("")?.innerText ?? "NA";

  // const salary = document.querySelector("")?.textContent ?? "NA";

  const jobLink = websiteUrl;

  const source = "Dice";

  const logoSrc =
    document.querySelector(".job-banner .brcs-logo img")?.src ?? "NA";

  return {
    companyName,
    positionTitle,
    companySize: "NA",
    websiteUrl,
    workplaceType: "NA",
    source,
    jobSchedule: "NA",
    salary: "NA",
    jobLink,
    logoSrc,
  };
};

// ###########################################################
// #################### SIMPLY HIRED #########################
// ###########################################################

const getSimplyHiredInfo = () => {
  const companyName = document.querySelector(".viewjob-labelWithIcon")
    ?.childNodes?.[1]?.data;

  const positionTitle =
    document.querySelector(".viewjob-jobTitle.h2")?.innerText ?? "NA";

  // const websiteUrl = document.querySelector("")?.href ?? "NA";

  // const workplaceType = document.querySelector("")?.textContent ?? "NA";

  // const jobSchedule = document.querySelector("")?.textContent ?? "NA";

  // const companySize = document.querySelector("")?.innerText ?? "NA";

  const salary =
    document.querySelector(".viewjob-labelWithIcon.viewjob-salary")
      ?.textContent ?? "NA";

  const jobLink =
    document.querySelector(".active [data-jobkey]")?.dataset?.jobkey ?? "NA";

  const source = "Simply Hired";

  const logoSrc =
    document.querySelector(".viewjob-company-logoImg")?.src ?? "NA";

  return {
    companyName,
    positionTitle,
    companySize: "NA",
    websiteUrl: "NA",
    workplaceType: "NA",
    source,
    jobSchedule: "NA",
    salary,
    jobLink: `https://www.simplyhired.com/job/${jobLink}`,
    logoSrc,
  };
};

// ###########################################################
// ################## WE WORK REMOTELY #######################
// ###########################################################

const getWeWorkRemotelyInfo = () => {
  const companyName =
    document.querySelector(".company-card > h2")?.textContent ?? "NA";

  const positionTitle =
    document.querySelector(".listing-header-container > h1")?.innerText ?? "NA";

  const websiteUrl =
    document.querySelector(".company-card > h3 a")?.href ?? "NA";

  // const workplaceType = document.querySelector("")?.textContent ?? "NA";

  const jobSchedule =
    document.querySelector(".listing-tag:nth-child(1)")?.textContent ?? "NA";

  // const companySize = document.querySelector("")?.innerText ?? "NA";

  // const salary = document.querySelector("")?.textContent ?? "NA";

  const jobLink = document.location.href;

  const source = "WeWorkRemotely";

  const logoSrc = document.querySelector(".listing-logo > img")?.src ?? "NA";

  return {
    companyName,
    positionTitle,
    companySize: "NA",
    websiteUrl,
    workplaceType: "NA",
    source,
    jobSchedule,
    salary: "NA",
    jobLink,
    logoSrc,
  };
};

// ###########################################################
// ################### AUTHENTIC JOBS ########################
// ###########################################################

const getAuthenticJobsInfo = () => {
  const companyName =
    document.querySelector(".job-post-date > strong")?.textContent ?? "NA";

  const positionTitle =
    document.querySelector(".entry-title.flexible-h1")?.innerText ?? "NA";

  const websiteUrl =
    document.querySelector(".application_details a")?.href ?? "NA";

  const workplaceType =
    document
      .querySelector(".location > div:nth-child(3)")
      ?.textContent?.trimStart() ?? "NA";

  const jobSchedule =
    document.querySelector(".job-type > div:nth-child(3)")?.innerText ?? "NA";

  // const companySize = document.querySelector("")?.innerText ?? "NA";

  const salary =
    document.querySelector(".salary > div:nth-child(3)")?.textContent ?? "NA";

  const jobLink = websiteUrl;

  const source = "AuthenticJobs";

  const logoSrc = document.querySelector(".company_logo")?.src ?? "NA";

  return {
    companyName,
    positionTitle,
    companySize: "NA",
    websiteUrl,
    workplaceType,
    source,
    jobSchedule,
    salary,
    jobLink,
    logoSrc,
  };
};

// ###########################################################
// ###################### FLEX JOBS ##########################
// ###########################################################

const getFlexJobsInfo = () => {
  const companyName = document.querySelector("")?.textContent ?? "NA";

  const positionTitle =
    document.querySelector(".row.row-offcanvas.row-offcanvas-right h1")
      ?.innerText ?? "NA";

  const websiteUrl = document.querySelector("")?.href ?? "NA";

  const workplaceType =
    document.querySelector(".job-details tr:nth-child(4) td").textContent
      ?.textContent ?? "NA";

  const jobSchedule =
    document.querySelector(".job-details tr:nth-child(5) td").innerText
      ?.innerText ?? "NA";

  const companySize = document.querySelector("")?.innerText ?? "NA";

  const salary = document.querySelector("")?.textContent ?? "NA";

  const jobLink = websiteUrl;

  const source = "FlexJobs";

  const logoSrc = document.querySelector("")?.src ?? "NA";

  return {
    companyName,
    positionTitle,
    companySize,
    websiteUrl,
    workplaceType,
    source,
    jobSchedule,
    salary,
    jobLink,
    logoSrc,
  };
};

// ###########################################################
// ##################### POWER TO FLY ########################
// ###########################################################

const getPowerToFlyInfo = () => {
  const companyName =
    document.querySelector(".params > a")?.textContent ?? "NA";

  const positionTitle =
    document.querySelector(".company-info-wrapper > h2")?.innerText ?? "NA";

  const websiteUrl = document.querySelector(".params > a")?.href ?? "NA";

  const workplaceType =
    document.querySelector("button.active > div.body > div > span.location")
      ?.innerText ?? "NA";

  // const jobSchedule = document.querySelector("")?.textContent ?? "NA";

  // const companySize = document.querySelector("")?.innerText ?? "NA";

  // const salary = document.querySelector("")?.textContent ?? "NA";

  const jobLink = websiteUrl;

  const source = "PowerToFly";

  const logoSrc =
    document.querySelector("button.active > div.logo > img")?.src || "NA";

  return {
    companyName,
    positionTitle,
    companySize: "NA",
    websiteUrl,
    workplaceType,
    source,
    jobSchedule: "NA",
    salary: "NA",
    jobLink,
    logoSrc,
  };
};

// ###########################################################
// #################### WORKING NOMADS #######################
// ###########################################################

const getWorkingNomadsInfo = () => {
  const companyName =
    document.querySelector(".company.ng-binding")?.textContent ?? "NA";

  const positionTitle =
    document.querySelector(".open-button.ng-binding")?.innerText ?? "NA";

  const websiteUrl = document.querySelector("")?.href ?? "NA";

  const workplaceType =
    document.querySelector(".tag > span.ng-binding")?.textContent ?? "NA";

  const jobSchedule = document.querySelector("")?.textContent ?? "NA";

  const companySize = document.querySelector("")?.innerText ?? "NA";

  const salary = document.querySelector("")?.textContent ?? "NA";

  const jobLink = websiteUrl;

  const source = "WorkingNomads";

  const logoSrc = document.querySelector(".navbar-brand > img")?.src ?? "NA";

  return {
    companyName,
    positionTitle,
    companySize,
    websiteUrl,
    workplaceType,
    source,
    jobSchedule,
    salary,
    jobLink,
    logoSrc,
  };
};

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  let applicationInfo;

  if (msg?.url?.includes("linkedin.com")) {
    applicationInfo = getLinkedInInfo();
  } else if (msg?.url?.includes("google.com")) {
    applicationInfo = getGoogleJobsInfo();
  } else if (msg?.url?.includes("indeed.com")) {
    applicationInfo = getIndeedInfo();
  } else if (msg?.url?.includes("glassdoor.com")) {
    applicationInfo = getGlassdoorInfo();
  } else if (msg?.url?.includes("dice.com")) {
    applicationInfo = getDiceInfo();
  } else if (msg?.url?.includes("simplyhired.com")) {
    applicationInfo = getSimplyHiredInfo();
  } else if (msg?.url?.includes("weworkremotely.com")) {
    applicationInfo = getWeWorkRemotelyInfo();
  } else if (msg?.url?.includes("authenticjobs.com")) {
    applicationInfo = getAuthenticJobsInfo();
  } else if (msg?.url?.includes("flexjobs.com")) {
    applicationInfo = getFlexJobsInfo();
  } else if (msg?.url?.includes("powertofly.com")) {
    applicationInfo = getPowerToFlyInfo();
  }

  callback(applicationInfo);
});
