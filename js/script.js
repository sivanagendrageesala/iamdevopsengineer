/* =========================================
CLOUDOPS PROJECT DATABASE
=========================

ADD NEW PROJECTS HERE.

Example:

{
title: "My New AWS Project",
category: "aws",
icon: "☁️",
description: "My new AWS project.",
file: "my-new-project.html",
tags: "AWS • EC2"
}

========================================= */

const projects = [


/* =====================================
   AWS PROJECTS
====================================== */

{
    title: "AWS Services Guide",
    category: "aws",
    icon: "☁️",
    description:
        "Explore AWS services and understand the core building blocks of cloud infrastructure.",
    file: "projects/aws-services-guide.html",
    tags: "AWS • Cloud"
},


{
    title: "AWS Story Guide",
    category: "aws",
    icon: "📖",
    description:
        "Interactive learning guide designed to understand AWS concepts through practical scenarios.",
    file: "projects/AWS-Story-Guide.html",
    tags: "AWS • Learning"
},


{
    title: "CloudWatch Animation",
    category: "aws",
    icon: "📊",
    description:
        "Animated guide demonstrating AWS CloudWatch monitoring concepts.",
    file: "projects/cloudwatch-animation.html",
    tags: "AWS • Monitoring"
},


{
    title: "CloudWatch Interactive Guide",
    category: "aws",
    icon: "📈",
    description:
        "Interactive guide for understanding CloudWatch metrics, alarms and monitoring.",
    file: "projects/CloudWatch-Interactive-Guide.html",
    tags: "AWS • CloudWatch"
},


{
    title: "EC2 Interactive Guide",
    category: "aws",
    icon: "🖥️",
    description:
        "Interactive AWS EC2 learning guide covering instances and cloud compute.",
    file: "projects/EC2-Interactive-Guide.html",
    tags: "AWS • EC2"
},


{
    title: "IAM Interactive Guide",
    category: "aws",
    icon: "🔐",
    description:
        "Learn AWS Identity and Access Management including users, roles and policies.",
    file: "projects/IAM-Interactive-Guide.html",
    tags: "AWS • IAM • Security"
},


{
    title: "S3 Interactive Guide",
    category: "aws",
    icon: "🪣",
    description:
        "Interactive guide covering Amazon S3, storage, buckets and cloud concepts.",
    file: "projects/S3-Interactive-Guide.html",
    tags: "AWS • S3"
},


/* =====================================
   DEVOPS PROJECTS
====================================== */

{
    title: "DevOps Cheat Sheet – All Scenarios",
    category: "devops",
    icon: "⚡",
    description:
        "Quick reference guide covering important DevOps troubleshooting scenarios.",
    file: "projects/devops_cheat_sheet_all_scenarios.html",
    tags: "DevOps • Troubleshooting"
},


{
    title: "DevOps Practice on AWS",
    category: "devops",
    icon: "⚙️",
    description:
        "Complete hands-on DevOps practice guide using AWS and Linux troubleshooting scenarios.",
    file: "projects/devops_practice_on_aws_complete_guide.html",
    tags: "DevOps • AWS • Linux"
},


{
    title: "Scenario 2 – Disk Space",
    category: "devops",
    icon: "💾",
    description:
        "Troubleshooting guide for disk space and storage-related server issues.",
    file: "projects/devops_scenario_2_disk_space.html",
    tags: "DevOps • Linux"
},


{
    title: "Scenario 3 – High CPU & Memory",
    category: "devops",
    icon: "📊",
    description:
        "Troubleshooting high CPU and memory utilization on servers.",
    file: "projects/devops_scenario_3_high_cpu_memory.html",
    tags: "DevOps • Monitoring"
},


{
    title: "Scenario 4 – Database Connection",
    category: "devops",
    icon: "🗄️",
    description:
        "Troubleshooting database connectivity and application issues.",
    file: "projects/devops_scenario_4_database_connection.html",
    tags: "DevOps • Database"
},


{
    title: "Scenario 5 – Backup Failed",
    category: "devops",
    icon: "💿",
    description:
        "Investigating and troubleshooting failed backup operations.",
    file: "projects/devops_scenario_5_backup_failed.html",
    tags: "DevOps • Backup"
},


{
    title: "Scenario 6 – SSL Expired",
    category: "devops",
    icon: "🔒",
    description:
        "Troubleshooting expired SSL certificates and HTTPS connectivity.",
    file: "projects/devops_scenario_6_ssl_expired.html",
    tags: "DevOps • SSL"
},


{
    title: "Scenario 7 – DNS Failing",
    category: "devops",
    icon: "🌐",
    description:
        "Troubleshooting DNS resolution and connectivity failures.",
    file: "projects/devops_scenario_7_dns_failing.html",
    tags: "DevOps • DNS"
},


{
    title: "DevOps Scenario Guide",
    category: "devops",
    icon: "🛠️",
    description:
        "Collection of practical DevOps troubleshooting scenarios.",
    file: "projects/devops_scenario_guide.html",
    tags: "DevOps • Guide"
},


{
    title: "DevOps Animated Tutorial",
    category: "devops",
    icon: "🎬",
    description:
        "Interactive and animated DevOps learning tutorial.",
    file: "projects/devops-animated-tutorial.html",
    tags: "DevOps • Learning"
},


{
    title: "DevOps Tools Tutorial",
    category: "devops",
    icon: "🔧",
    description:
        "Explore important DevOps tools and technologies.",
    file: "projects/devops-tools-tutorial.html",
    tags: "DevOps • Tools"
},


/* =====================================
   LINUX PROJECTS
====================================== */

{
    title: "Linux DevOps Commands",
    category: "linux",
    icon: "🐧",
    description:
        "Useful Linux and DevOps commands for administration and troubleshooting.",
    file: "projects/Linux-DevOps-Commands.html",
    tags: "Linux • Commands"
},


{
    title: "Shell Scripting Guide",
    category: "linux",
    icon: "📜",
    description:
        "Practical shell scripting concepts and command examples.",
    file: "projects/shell_scripting_guide.html",
    tags: "Linux • Shell"
},


/* =====================================
   NETWORKING PROJECTS
====================================== */

{
    title: "Subnetting Diagram",
    category: "networking",
    icon: "🌐",
    description:
        "Visual networking guide explaining subnetting and IP addressing concepts.",
    file: "projects/subnetting-diagram.html",
    tags: "Networking • Subnetting"
}


];

/* =========================================
DOM ELEMENTS
========================================= */

const projectContainer =
document.getElementById("projectContainer");

const searchInput =
document.getElementById("searchInput");

const filters =
document.querySelectorAll(".filter");

const projectStatus =
document.getElementById("projectStatus");

/* =========================================
CURRENT FILTER
========================================= */

let currentCategory = "all";

/* =========================================
DISPLAY PROJECTS
========================================= */

function displayProjects() {


projectContainer.innerHTML = "";

const searchText =
    searchInput.value
        .trim()
        .toLowerCase();


const filteredProjects =
    projects.filter(project => {

        const matchesCategory =
            currentCategory === "all" ||
            project.category === currentCategory;


        const searchableText =
            (
                project.title +
                " " +
                project.description +
                " " +
                project.tags
            ).toLowerCase();


        const matchesSearch =
            searchableText.includes(searchText);


        return (
            matchesCategory &&
            matchesSearch
        );

    });


projectStatus.textContent =
    `${filteredProjects.length} projects available`;


/* =====================================
   NO RESULTS
====================================== */

if (filteredProjects.length === 0) {

    projectContainer.innerHTML = `

        <div class="empty">

            <h3>
                No projects found
            </h3>

            <br>

            Try searching for something else.

        </div>

    `;

    return;
}


/* =====================================
   CREATE PROJECT CARDS
====================================== */

filteredProjects.forEach(project => {

    const card =
        document.createElement("a");


    card.href =
        project.file;


    card.className =
        "project-card";


    card.innerHTML = `

        <div>

            <div class="project-icon">

                ${project.icon}

            </div>


            <div class="category">

                ${project.category}

            </div>


            <h2>

                ${project.title}

            </h2>


            <p>

                ${project.description}

            </p>

        </div>


        <div class="project-footer">

            <span>

                ${project.tags}

            </span>


            <span class="open-project">

                →

            </span>

        </div>

    `;


    projectContainer.appendChild(card);

});


}

/* =========================================
FILTER PROJECTS
========================================= */

filters.forEach(filter => {


filter.addEventListener(
    "click",
    () => {

        filters.forEach(button => {

            button.classList.remove("active");

        });


        filter.classList.add("active");


        currentCategory =
            filter.dataset.category;


        displayProjects();

    }
);


});

/* =========================================
SEARCH PROJECTS
========================================= */

searchInput.addEventListener(
"input",
displayProjects
);

/* =========================================
UPDATE STATISTICS
========================================= */

function updateStatistics() {


document.getElementById(
    "totalCount"
).textContent =
    projects.length;


document.getElementById(
    "awsCount"
).textContent =
    projects.filter(
        project =>
            project.category === "aws"
    ).length;


document.getElementById(
    "devopsCount"
).textContent =
    projects.filter(
        project =>
            project.category === "devops"
    ).length;


document.getElementById(
    "linuxCount"
).textContent =
    projects.filter(
        project =>
            project.category === "linux"
    ).length;


document.getElementById(
    "networkCount"
).textContent =
    projects.filter(
        project =>
            project.category === "networking"
    ).length;


}

/* =========================================
INITIALIZE WEBSITE
========================================= */

function initializePortfolio() {


updateStatistics();

displayProjects();


}

/* =========================================
START
========================================= */

initializePortfolio();
