export const personal = {
  name: "Priyansh Gupta",
  title: "Senior DevOps Engineer",
  email: "priyansh.9071@gmail.com",
  phone: "+971 506479919",
  location: "Dubai, UAE",
  github: "https://github.com/priyansh19",
  linkedin: "https://linkedin.com/in/priyansh-gupta",
  tagline: "Designing resilient cloud platforms, GitOps pipelines & Kubernetes ecosystems that scale.",
  bio: "I'm a Senior DevOps Engineer with 5+ years of experience architecting production-grade infrastructure on Azure, AWS, and GCP. I specialize in Kubernetes orchestration, GitOps workflows, and building CI/CD pipelines that accelerate developer velocity. Currently pursuing an MSc in AI at Heriot-Watt University, Dubai.",
};

export interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  current?: boolean;
  color: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    role: "Senior DevOps Engineer",
    company: "Applied Information Services (AIS)",
    type: "Full-time",
    period: "Aug 2024 — Present",
    current: true,
    color: "#6366f1",
    points: [
      "Designed and implemented JFrog Artifactory across the entire organisation for universal artifact management — replacing fragmented solutions with a unified binary repository.",
      "Utilised OpsLevel to streamline CI/CD pipelines, establishing service ownership frameworks and improving developer productivity through automated maturity scorecards.",
      "Led the evaluation and adoption of AI-assisted DevOps tooling, integrating OpenAI APIs into internal automation scripts.",
    ],
  },
  {
    role: "DevOps Engineer",
    company: "Applied Information Services (AIS)",
    type: "Full-time",
    period: "Oct 2022 — Aug 2024",
    color: "#22d3ee",
    points: [
      "Engineered production Helm Charts for seamless application onboarding to Azure Kubernetes Service (AKS), reducing deployment friction by 60%.",
      "Implemented Kyverno policies for dynamic admission control — enforcing governance, security baselines, and resource quotas cluster-wide.",
      "Deployed FluxCD for GitOps-style cluster bootstrapping and continuous reconciliation, achieving drift-free infrastructure state.",
      "Configured Istio service mesh: ingress gateways, virtual services, destination rules, mTLS peer authentication, and distributed tracing with Jaeger.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Applied Information Services (AIS)",
    type: "Full-time",
    period: "May 2021 — Oct 2022",
    color: "#10b981",
    points: [
      "Configured Helm Charts to securely retrieve secrets from Azure Key Vault using the Secrets Store CSI Driver.",
      "Developed reusable Terraform modules for establishing baseline Azure infrastructure (VNets, NSGs, AKS, Key Vault, ACR).",
      "Crafted reusable CI/CD YAML pipeline templates on Azure DevOps — cutting new project onboarding from days to hours.",
    ],
  },
  {
    role: "DevOps / SRE Consultant",
    company: "Freelance",
    type: "Consulting",
    period: "Aug 2022 — Present",
    color: "#f59e0b",
    points: [
      "Architected end-to-end CI/CD pipelines and GitOps workflows for multiple startup and enterprise clients.",
      "Designed observability stacks using Prometheus, Grafana, and Loki — delivering real-time SLA dashboards and alerting.",
      "Automated infrastructure provisioning across AWS (EKS, EC2, S3, RDS) using Terraform and Ansible playbooks.",
    ],
  },
  {
    role: "DevOps Intern",
    company: "StatusNeo",
    type: "Internship",
    period: "Feb 2020 — Jul 2020",
    color: "#8b5cf6",
    points: [
      "Implemented robust CI/CD pipelines on Azure DevOps Server, establishing release gates and automated test integration.",
      "Facilitated the organisation's transition to Docker-based deployments and executed cloud migration from on-premises.",
      "Executed manual and automated deployments across Dev, QA, and Production environments with zero-downtime strategies.",
    ],
  },
];

export interface SkillRing {
  name: string;
  level: number;
  icon: string;
  color: string;
}

export const topSkills: SkillRing[] = [
  { name: "Kubernetes", level: 95, icon: "☸", color: "#326ce5" },
  { name: "Azure", level: 95, icon: "☁", color: "#0078d4" },
  { name: "Docker", level: 95, icon: "🐳", color: "#2496ed" },
  { name: "Terraform", level: 92, icon: "⬡", color: "#7b42bc" },
  { name: "Helm", level: 90, icon: "⛵", color: "#0f1689" },
  { name: "FluxCD", level: 88, icon: "🔁", color: "#5468ff" },
];

export interface SkillGroup {
  title: string;
  color: string;
  skills: { name: string; level: number }[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Cloud Platforms",
    color: "#6366f1",
    skills: [
      { name: "Azure", level: 95 },
      { name: "AWS", level: 80 },
      { name: "GCP", level: 60 },
    ],
  },
  {
    title: "CI/CD & GitOps",
    color: "#22d3ee",
    skills: [
      { name: "Azure DevOps", level: 95 },
      { name: "ArgoCD", level: 85 },
      { name: "FluxCD", level: 88 },
      { name: "Jenkins", level: 75 },
    ],
  },
  {
    title: "Infrastructure as Code",
    color: "#10b981",
    skills: [
      { name: "Terraform", level: 92 },
      { name: "Ansible", level: 80 },
      { name: "ARM Templates", level: 85 },
      { name: "Kustomize", level: 82 },
    ],
  },
  {
    title: "Observability",
    color: "#f59e0b",
    skills: [
      { name: "Prometheus & Grafana", level: 85 },
      { name: "Loki", level: 78 },
      { name: "JFrog Artifactory", level: 90 },
      { name: "SonarQube", level: 80 },
    ],
  },
];

export const techStack = [
  "Docker", "Kubernetes", "Terraform", "Helm", "Kustomize",
  "Istio", "Kyverno", "FluxCD", "ArgoCD", "Azure DevOps",
  "GitHub Actions", "Jenkins", "AWS CodePipeline", "JFrog",
  "SonarQube", "Prometheus", "Grafana", "Loki", "Jaeger",
  "Azure", "AWS", "GCP", "Bash", "Python", "YAML", "Git",
  "OpsLevel", "Ansible", "Vault", "cert-manager", "OpenAI",
];

export interface Project {
  title: string;
  description: string;
  detail: string;
  tags: string[];
  icon: string;
  color: string;
}

export const projects: Project[] = [
  {
    title: "Istio Service Mesh Platform",
    description: "Production-grade service mesh with mTLS, traffic management, and distributed tracing.",
    detail: "Configured Istio ingress gateways, virtual services, destination rules, and PeerAuthentication for mTLS. Integrated Jaeger for distributed tracing and Kiali for service topology visualisation. Implemented circuit breaking, retries, and canary traffic splitting for zero-downtime deployments.",
    tags: ["Istio", "Kubernetes", "mTLS", "Jaeger", "Kiali"],
    icon: "🌐",
    color: "#6366f1",
  },
  {
    title: "Multi-Cluster ArgoCD Platform",
    description: "Centralised ArgoCD server managing 10+ Kubernetes clusters with full GitOps governance.",
    detail: "Set up a hub-spoke ArgoCD architecture managing 10+ clusters. Architected ApplicationSet patterns for multi-environment (dev/staging/prod) deployments. Configured RBAC, SSO via Dex, and project-level access controls. Implemented Argo Rollouts for blue/green and canary strategies.",
    tags: ["ArgoCD", "GitOps", "Kubernetes", "Helm", "RBAC"],
    icon: "🔄",
    color: "#22d3ee",
  },
  {
    title: "FluxCD GitOps Pipeline",
    description: "Automated reconciliation pipeline with Flux v2, Kustomize overlays, and image automation.",
    detail: "Configured Flux v2 for GitLab servers with self-signed certificates. Structured repositories with Kustomize overlays for environment-specific configuration. Implemented Flux Image Automation Controller for automated image updates and sealed secrets for secret management.",
    tags: ["FluxCD", "Kustomize", "GitLab", "Sealed Secrets"],
    icon: "🔁",
    color: "#10b981",
  },
  {
    title: "AWS Terraform Module Library",
    description: "Reusable, version-controlled Terraform modules for EKS, S3, KMS, EC2, and networking.",
    detail: "Built a modular Terraform library with versioned modules for S3 (with lifecycle policies), EKS (with managed node groups, IRSA), EC2 (with ASG), KMS (key rotation), and VPC (multi-AZ subnets, NAT gateways). Each module published to a private Terraform registry with semantic versioning.",
    tags: ["Terraform", "AWS", "EKS", "IaC", "Modules"],
    icon: "🏗️",
    color: "#f59e0b",
  },
  {
    title: "Platform Observability Stack",
    description: "Full-stack monitoring with Prometheus, Grafana, Loki, and alerting via PagerDuty.",
    detail: "Deployed kube-prometheus-stack via Helm. Built 20+ custom Grafana dashboards for cluster health, application metrics, and SLA tracking. Configured Loki for log aggregation with label-based querying. Set up PagerDuty integration with escalation policies and on-call schedules.",
    tags: ["Prometheus", "Grafana", "Loki", "PagerDuty", "Helm"],
    icon: "📊",
    color: "#8b5cf6",
  },
  {
    title: "Azure DevOps Template Library",
    description: "Enterprise-grade reusable pipeline templates cutting project onboarding from days to hours.",
    detail: "Designed a library of reusable YAML templates for build, test, security scan, and deploy stages. Included SonarQube code quality gates, container image scanning with Trivy, and automated Helm chart deployments to AKS with environment-specific approval gates.",
    tags: ["Azure DevOps", "YAML", "Trivy", "SonarQube", "AKS"],
    icon: "⚙️",
    color: "#f43f5e",
  },
];

export interface Education {
  degree: string;
  field: string;
  school: string;
  location: string;
  period: string;
  current?: boolean;
  gpa?: string;
  highlights: string[];
}

export const education: Education[] = [
  {
    degree: "MSc",
    field: "Artificial Intelligence",
    school: "Heriot-Watt University",
    location: "Dubai, UAE",
    period: "2025 — 2026",
    current: true,
    highlights: [
      "Machine Learning & Deep Learning",
      "Natural Language Processing",
      "AI for Cloud Operations (AIOps)",
    ],
  },
  {
    degree: "B.Tech",
    field: "Computer Science & Engineering",
    school: "UPES",
    location: "Dehradun, India",
    period: "2017 — 2021",
    gpa: "8.0 / 10.0",
    highlights: [
      "Cloud Computing & Distributed Systems",
      "Operating Systems & Networking",
      "Software Engineering",
    ],
  },
];

export interface Certification {
  name: string;
  code: string;
  issuer: string;
  category: "kubernetes" | "azure";
  color: string;
}

export const certifications: Certification[] = [
  { name: "Certified Kubernetes Administrator", code: "CKA", issuer: "The Linux Foundation", category: "kubernetes", color: "#326ce5" },
  { name: "Certified Kubernetes Application Developer", code: "CKAD", issuer: "The Linux Foundation", category: "kubernetes", color: "#326ce5" },
  { name: "Azure DevOps Engineer Expert", code: "AZ-400", issuer: "Microsoft", category: "azure", color: "#0078d4" },
  { name: "Azure Network Engineer Associate", code: "AZ-700", issuer: "Microsoft", category: "azure", color: "#0078d4" },
  { name: "Azure Administrator Associate", code: "AZ-104", issuer: "Microsoft", category: "azure", color: "#0078d4" },
  { name: "Azure Fundamentals", code: "AZ-900", issuer: "Microsoft", category: "azure", color: "#0078d4" },
];

export const achievements = [
  { icon: "🏆", title: "CKA & CKAD Certified", desc: "Top 5% globally in Kubernetes certifications from The Linux Foundation." },
  { icon: "☁️", title: "4x Microsoft Azure Certified", desc: "Expert, Associate, and Fundamentals certifications across DevOps and Networking." },
  { icon: "🚀", title: "Enterprise GitOps Pioneer", desc: "Led GitOps adoption for 10+ Kubernetes clusters serving 200+ microservices." },
  { icon: "📦", title: "JFrog Artifactory Rollout", desc: "Architected org-wide artifact management replacing 5+ fragmented tools." },
  { icon: "🎓", title: "MSc in AI — Active Pursuit", desc: "Bridging DevOps and AI/ML Operations (AIOps) at Heriot-Watt University." },
  { icon: "⚡", title: "60% Deployment Acceleration", desc: "Helm-based onboarding framework cut new service deployment time by 60%." },
];

export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
