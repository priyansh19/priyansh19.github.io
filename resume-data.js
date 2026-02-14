/**
 * PRIYANSH GUPTA - INTERACTIVE 3D RESUME DATA
 * All professional information & resume content
 */

const resumeData = {
  // ========== CONTACT & INTRO ==========
  contact: {
    name: "Priyansh Gupta",
    title: "Senior DevOps Engineer",
    email: "priyansh.9071@gmail.com",
    phone: "+971 506479919",
    location: "Dubai, UAE",
    linkedin: "https://www.linkedin.com/in/priyansh-gupta",
    github: "https://github.com/priyansh19",
    bio: "Senior DevOps Engineer with 3+ years of experience designing and implementing scalable cloud infrastructure. Specialized in Kubernetes, Terraform, CI/CD automation, and enterprise DevOps solutions across Azure, AWS, and GCP."
  },

  // ========== WORK EXPERIENCE ==========
  experience: [
    {
      id: "exp-1",
      company: "Applied Information Services (AIS)",
      role: "Senior DevOps Engineer",
      period: "August 2024 - Present",
      location: "Dubai, UAE",
      highlights: [
        "Designed and implemented JFrog across the organization, empowering development teams to publish packages and Docker images with team isolation",
        "Utilized OpsLevel to streamline and manage CI/CD pipelines, automating application build, test, and deployment processes",
        "Led infrastructure modernization initiatives improving deployment efficiency by 40%"
      ]
    },
    {
      id: "exp-2",
      company: "Applied Information Services (AIS)",
      role: "DevOps Engineer",
      period: "October 2022 - August 2024",
      location: "Dubai, UAE",
      highlights: [
        "Engineered Helm Charts for seamless application onboarding to Azure Kubernetes Service (AKS)",
        "Orchestrated end-to-end automated Azure pipeline deployments",
        "Implemented Kyverno policies for dynamic admission control, enhancing AKS cluster security",
        "Employed FLUX for GitOps-style cluster bootstrapping, ensuring optimal tooling integration"
      ]
    },
    {
      id: "exp-3",
      company: "Applied Information Services (AIS)",
      role: "Software Engineer",
      period: "May 2021 - October 2022",
      location: "India",
      highlights: [
        "Configured Helm Charts to securely retrieve secrets from Azure Key Vault using CSI storage class",
        "Developed Terraform modules for establishing baseline Azure infrastructure (VNets, Subnets, Security Groups, App Services, Key Vaults, Storage Accounts, etc.)",
        "Crafted reusable CI/CD YAML pipeline templates on Azure DevOps for AKS and App Service deployments"
      ]
    },
    {
      id: "exp-4",
      company: "StatusNeo",
      role: "DevOps Internship",
      period: "Feb 2020 - July 2020",
      location: "India",
      highlights: [
        "Implemented robust CI/CD pipelines on Azure DevOps Server",
        "Facilitated transition to Docker and executed migration from on-premise to cloud environments",
        "Executed manual and automated deployments across diverse environments"
      ]
    },
    {
      id: "exp-5",
      company: "Freelance",
      role: "DevOps/SRE Consultant",
      period: "August 2022 - Present",
      location: "Remote",
      highlights: [
        "3+ years of freelancing experience delivering robust DevOps solutions using Azure DevOps, GitHub, GitLab, and Jenkins",
        "Designed and deployed CI/CD pipelines and GitOps workflows with ArgoCD, Flux, Helm, and Kubernetes",
        "Provisioned cloud infrastructure on Azure, AWS, and GCP using Terraform, Ansible, and Helm",
        "Integrated JFrog Artifactory, Azure Artifacts, and GitHub Packages for artifact management",
        "Implemented end-to-end observability using Prometheus, Grafana, and New Relic"
      ]
    }
  ],

  // ========== PROJECTS ==========
  projects: [
    {
      id: "proj-1",
      name: "Istio Service Mesh Configuration",
      description: "Configured ingress gateway to manage incoming traffic effectively with advanced routing capabilities",
      highlights: [
        "Configured Istio ingress gateway for traffic management",
        "Created VirtualServices and DestinationRules for traffic routing based on subsets",
        "Implemented peer authentication for mutual TLS between services"
      ],
      technologies: ["Istio", "Kubernetes", "mTLS", "gRPC"]
    },
    {
      id: "proj-2",
      name: "ArgoCD Kubernetes Cluster Management",
      description: "Set up centralized ArgoCD server for efficient management of multiple Kubernetes clusters",
      highlights: [
        "Established centralized ArgoCD server for multi-cluster management",
        "Configured ArgoCD projects with resource and repository restrictions",
        "Architected repository structures for streamlined team deployment management"
      ],
      technologies: ["ArgoCD", "Kubernetes", "GitOps", "Git"]
    },
    {
      id: "proj-3",
      name: "FluxCD Cluster Management",
      description: "Configured FLUX for cluster bootstrapping with advanced overlay strategies",
      highlights: [
        "Configured FLUX to connect with privately hosted GitLab servers using self-signed certificates",
        "Utilized Kustomization overlays to bootstrap diverse Kubernetes clusters with necessary tooling",
        "Implemented automated cluster reconciliation and disaster recovery"
      ],
      technologies: ["FluxCD", "Kubernetes", "Kustomize", "GitOps"]
    },
    {
      id: "proj-4",
      name: "AWS Infrastructure as Code",
      description: "Developed comprehensive Terraform configurations for AWS resource provisioning",
      highlights: [
        "Developed Terraform configurations for S3 buckets, EKS clusters, EC2 instances, KMS keys",
        "Ensured modular configuration for versatile usage across multiple environments",
        "Implemented state management and drift detection strategies"
      ],
      technologies: ["Terraform", "AWS", "IaC", "Python"]
    }
  ],

  // ========== SKILLS & TOOLS ==========
  skills: {
    "Containers & Orchestration": [
      "Docker", "Kubernetes", "Helm Charts", "Kyverno", "Container Registry"
    ],
    "Infrastructure as Code": [
      "Terraform", "Arm Templates", "Ansible", "CloudFormation"
    ],
    "Cloud Platforms": [
      "Azure (AKS, App Service, Function Apps)", "AWS (EC2, EKS, S3, RDS)", "GCP"
    ],
    "Artifact Management": [
      "JFrog Artifactory", "Azure Artifacts", "GitHub Packages", "OpsLevel"
    ],
    "Monitoring & Observability": [
      "Prometheus", "Grafana", "Kube Lens", "New Relic", "Application Insights"
    ],
    "CI/CD & GitOps": [
      "Azure DevOps", "Jenkins", "GitHub Actions", "GitLab CI", "FluxCD", "ArgoCD", "Istio"
    ],
    "Scripting & Languages": [
      "Bash", "PowerShell", "YAML", "Python", "JSON"
    ],
    "Version Control": [
      "Git", "GitHub", "GitLab", "Azure DevOps Repos", "Bitbucket"
    ],
    "Code Quality": [
      "SonarQube", "Code scanning"
    ],
    "Other Tools": [
      "ChatGPT", "OpenAI", "Jenkins", "Terraform Cloud"
    ]
  },

  // ========== EDUCATION ==========
  education: [
    {
      id: "edu-1",
      school: "Heriot Watt University",
      location: "Dubai, UAE",
      degree: "MSc. in Artificial Intelligence",
      period: "2025-2026 (Current)",
      gpa: null,
      highlights: ["Advanced AI and Machine Learning", "AI systems architecture", "Research focus"]
    },
    {
      id: "edu-2",
      school: "University of Petroleum and Energy Studies (UPES)",
      location: "Dehradun, India",
      degree: "B.Tech in Computer Science",
      period: "2017 - 2021",
      gpa: "8.0/10",
      highlights: ["Strong foundation in software engineering", "Computer science fundamentals", "Project-based learning"]
    }
  ],

  // ========== CERTIFICATIONS ==========
  certifications: [
    {
      id: "cert-1",
      name: "CKA",
      title: "Certified Kubernetes Administrator",
      issuer: "Linux Foundation",
      status: "Active"
    },
    {
      id: "cert-2",
      name: "CKAD",
      title: "Certified Kubernetes Application Developer",
      issuer: "Linux Foundation",
      status: "Active"
    },
    {
      id: "cert-3",
      name: "AZ-400",
      title: "Azure DevOps Expert",
      issuer: "Microsoft",
      status: "Active"
    },
    {
      id: "cert-4",
      name: "AZ-700",
      title: "Design and Implementing Microsoft Azure Networking Solutions",
      issuer: "Microsoft",
      status: "Active"
    },
    {
      id: "cert-5",
      name: "AZ-104",
      title: "Azure Administrator",
      issuer: "Microsoft",
      status: "Active"
    },
    {
      id: "cert-6",
      name: "AZ-900",
      title: "Azure Fundamentals",
      issuer: "Microsoft",
      status: "Active"
    }
  ],

  // ========== RESUME ZONES (3D LOCATIONS) ==========
  zones: {
    welcome: {
      id: "zone-welcome",
      name: "Welcome Center",
      description: "Start your journey here",
      icon: "🚀"
    },
    experience: {
      id: "zone-experience",
      name: "Work Experience Tower",
      description: "Explore my professional journey",
      icon: "🏢"
    },
    projects: {
      id: "zone-projects",
      name: "Projects Lab",
      description: "Discover my technical projects",
      icon: "⚙️"
    },
    skills: {
      id: "zone-skills",
      name: "Skills Hub",
      description: "View my technical expertise",
      icon: "💡"
    },
    education: {
      id: "zone-education",
      name: "Academic Center",
      description: "Learn about my education",
      icon: "📚"
    },
    certifications: {
      id: "zone-certifications",
      name: "Achievements Gallery",
      description: "View my certifications",
      icon: "🏆"
    }
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = resumeData;
}
