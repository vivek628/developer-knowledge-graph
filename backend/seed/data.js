// This dataset is deterministic so every reviewer sees the same useful graph.
// The relationships are intentionally shared across teams and projects.

export const companies = [
  { id: 'company-01', name: 'Northstar Labs' },
  { id: 'company-02', name: 'FinPeak Systems' },
  { id: 'company-03', name: 'CareBridge Health' },
];

export const teams = [
  { id: 'team-01', name: 'Platform Engineering' },
  { id: 'team-02', name: 'Developer Experience' },
  { id: 'team-03', name: 'Data Intelligence' },
  { id: 'team-04', name: 'Customer Products' },
  { id: 'team-05', name: 'Security Engineering' },
];

export const skills = [
  ['skill-01', 'JavaScript', 'Language'], ['skill-02', 'TypeScript', 'Language'],
  ['skill-03', 'Python', 'Language'], ['skill-04', 'Java', 'Language'],
  ['skill-05', 'Go', 'Language'], ['skill-06', 'SQL', 'Data'],
  ['skill-07', 'Cypher', 'Data'], ['skill-08', 'React', 'Frontend'],
  ['skill-09', 'Node.js', 'Backend'], ['skill-10', 'Express', 'Backend'],
  ['skill-11', 'GraphQL', 'API'], ['skill-12', 'REST API Design', 'API'],
  ['skill-13', 'Neo4j', 'Data'], ['skill-14', 'PostgreSQL', 'Data'],
  ['skill-15', 'MongoDB', 'Data'], ['skill-16', 'Redis', 'Data'],
  ['skill-17', 'Kafka', 'Messaging'], ['skill-18', 'Docker', 'DevOps'],
  ['skill-19', 'Kubernetes', 'DevOps'], ['skill-20', 'AWS', 'Cloud'],
  ['skill-21', 'Terraform', 'DevOps'], ['skill-22', 'GitHub Actions', 'DevOps'],
  ['skill-23', 'Jest', 'Testing'], ['skill-24', 'Cypress', 'Testing'],
  ['skill-25', 'System Design', 'Architecture'], ['skill-26', 'Microservices', 'Architecture'],
  ['skill-27', 'Observability', 'Operations'], ['skill-28', 'Application Security', 'Security'],
  ['skill-29', 'Machine Learning', 'Data Science'], ['skill-30', 'Data Modeling', 'Data'],
  ['skill-31', 'Shopify Development', 'E-commerce'], ['skill-32', 'MERN Stack', 'Full Stack'],
].map(([id, name, category]) => ({ id, name, category }));

export const technologies = [
  'Node.js', 'React', 'GraphQL', 'Docker', 'Redis', 'AWS', 'MongoDB',
  'Kafka', 'Express', 'PostgreSQL', 'Neo4j', 'Kubernetes', 'Terraform',
  'Python', 'GitHub Actions',
].map((name, index) => ({ id: `technology-${String(index + 1).padStart(2, '0')}`, name }));

export const projects = [
  { id: 'project-01', name: 'Atlas Developer Portal', description: 'A central catalog for engineering services and ownership.', status: 'Active' },
  { id: 'project-02', name: 'Pulse Observability', description: 'Unified application metrics, traces, and incident context.', status: 'Active' },
  { id: 'project-03', name: 'Graph Talent Finder', description: 'A graph-powered internal expert discovery tool.', status: 'Active' },
  { id: 'project-04', name: 'Ledger Payments API', description: 'A reliable API for customer payment workflows.', status: 'Active' },
  { id: 'project-05', name: 'Nimbus Cloud Migration', description: 'Migration of legacy workloads to managed cloud services.', status: 'Completed' },
  { id: 'project-06', name: 'CareConnect', description: 'A secure patient and clinician communication platform.', status: 'Active' },
  { id: 'project-07', name: 'Stream Insights', description: 'Near-real-time customer event analytics.', status: 'Active' },
  { id: 'project-08', name: 'Shield Access', description: 'Centralized authorization and security policy management.', status: 'Active' },
  { id: 'project-09', name: 'Quality Hub', description: 'Automated release quality and test reporting.', status: 'Planned' },
  { id: 'project-10', name: 'Recommendation Studio', description: 'Machine-learning tools for product recommendations.', status: 'Planned' },
];

export const repositories = [
  'developer-portal', 'telemetry-service', 'talent-graph-api', 'payments-api',
  'cloud-infrastructure', 'careconnect-web', 'event-stream-processor',
  'authorization-service', 'quality-dashboard', 'recommendation-engine',
].map((name, index) => ({
  id: `repository-${String(index + 1).padStart(2, '0')}`,
  name,
  githubUrl: `https://github.com/northstar-labs/${name}`,
}));

export const developers = [
  ['developer-01', 'Aarav Sharma', 'aarav.sharma@example.com', 9, 'Staff Backend Engineer'],
  ['developer-02', 'Maya Patel', 'maya.patel@example.com', 7, 'Senior Frontend Engineer'],
  ['developer-03', 'Noah Williams', 'noah.williams@example.com', 6, 'Senior Platform Engineer'],
  ['developer-04', 'Ananya Iyer', 'ananya.iyer@example.com', 5, 'Data Engineer'],
  ['developer-05', 'Liam Chen', 'liam.chen@example.com', 8, 'Staff Data Engineer'],
  ['developer-06', 'Sofia Martinez', 'sofia.martinez@example.com', 4, 'Frontend Engineer'],
  ['developer-07', 'Vikram Rao', 'vikram.rao@example.com', 10, 'Principal Engineer'],
  ['developer-08', 'Emma Johnson', 'emma.johnson@example.com', 6, 'Security Engineer'],
  ['developer-09', 'Kabir Singh', 'kabir.singh@example.com', 3, 'Backend Engineer'],
  ['developer-10', 'Olivia Brown', 'olivia.brown@example.com', 5, 'Site Reliability Engineer'],
  ['developer-11', 'Arjun Mehta', 'arjun.mehta@example.com', 7, 'Senior Full Stack Engineer'],
  ['developer-12', 'Isabella Garcia', 'isabella.garcia@example.com', 2, 'Software Engineer'],
  ['developer-13', 'Riya Kapoor', 'riya.kapoor@example.com', 6, 'Machine Learning Engineer'],
  ['developer-14', 'Ethan Davis', 'ethan.davis@example.com', 4, 'DevOps Engineer'],
  ['developer-15', 'Meera Nair', 'meera.nair@example.com', 8, 'Engineering Manager'],
  ['developer-16', 'Lucas Wilson', 'lucas.wilson@example.com', 3, 'Quality Engineer'],
  ['developer-17', 'Ishaan Gupta', 'ishaan.gupta@example.com', 5, 'Graph Engineer'],
  ['developer-18', 'Amelia Taylor', 'amelia.taylor@example.com', 7, 'Solutions Architect'],
  ['developer-19', 'Aditya Joshi', 'aditya.joshi@example.com', 2, 'Associate Engineer'],
  ['developer-20', 'Harper Anderson', 'harper.anderson@example.com', 4, 'Product Engineer'],
  ['developer-21', 'Vivek Silori', 'siloriv2@gmail.com', 1.5, 'MERN Stack & Shopify Developer'],
].map(([id, name, email, experience, designation]) => ({ id, name, email, experience, designation }));

// Compact maps make the shared experience easy to review and edit. The seed
// runner converts each map into parameter objects for Cypher.
export const developerSkills = {
  'developer-01': ['skill-01', 'skill-09', 'skill-10', 'skill-12', 'skill-25', 'skill-26'],
  'developer-02': ['skill-01', 'skill-02', 'skill-08', 'skill-11', 'skill-24'],
  'developer-03': ['skill-05', 'skill-18', 'skill-19', 'skill-20', 'skill-21', 'skill-27'],
  'developer-04': ['skill-03', 'skill-06', 'skill-14', 'skill-17', 'skill-30'],
  'developer-05': ['skill-03', 'skill-06', 'skill-07', 'skill-13', 'skill-17', 'skill-30'],
  'developer-06': ['skill-01', 'skill-08', 'skill-11', 'skill-23', 'skill-24'],
  'developer-07': ['skill-04', 'skill-20', 'skill-25', 'skill-26', 'skill-28'],
  'developer-08': ['skill-04', 'skill-12', 'skill-20', 'skill-28'],
  'developer-09': ['skill-01', 'skill-09', 'skill-10', 'skill-15', 'skill-16'],
  'developer-10': ['skill-05', 'skill-18', 'skill-19', 'skill-20', 'skill-27'],
  'developer-11': ['skill-01', 'skill-02', 'skill-08', 'skill-09', 'skill-11', 'skill-12'],
  'developer-12': ['skill-01', 'skill-08', 'skill-09', 'skill-23'],
  'developer-13': ['skill-03', 'skill-06', 'skill-17', 'skill-29', 'skill-30'],
  'developer-14': ['skill-18', 'skill-19', 'skill-20', 'skill-21', 'skill-22'],
  'developer-15': ['skill-12', 'skill-25', 'skill-26', 'skill-27'],
  'developer-16': ['skill-01', 'skill-22', 'skill-23', 'skill-24'],
  'developer-17': ['skill-03', 'skill-07', 'skill-13', 'skill-25', 'skill-30'],
  'developer-18': ['skill-11', 'skill-20', 'skill-21', 'skill-25', 'skill-26'],
  'developer-19': ['skill-01', 'skill-09', 'skill-10', 'skill-23'],
  'developer-20': ['skill-01', 'skill-02', 'skill-08', 'skill-12', 'skill-24'],
  'developer-21': ['skill-01', 'skill-08', 'skill-09', 'skill-10', 'skill-12', 'skill-15', 'skill-14', 'skill-18', 'skill-20', 'skill-22', 'skill-31', 'skill-32'],
};

export const teamMembers = {
  'team-01': ['developer-01', 'developer-03', 'developer-07', 'developer-10'],
  'team-02': ['developer-02', 'developer-06', 'developer-11', 'developer-19'],
  'team-03': ['developer-04', 'developer-05', 'developer-13', 'developer-17'],
  'team-04': ['developer-09', 'developer-12', 'developer-15', 'developer-20'],
  'team-05': ['developer-08', 'developer-14', 'developer-16', 'developer-18'],
};

export const projectDevelopers = {
  'project-01': ['developer-02', 'developer-03', 'developer-11', 'developer-19'],
  'project-02': ['developer-01', 'developer-04', 'developer-10', 'developer-14'],
  'project-03': ['developer-05', 'developer-11', 'developer-17', 'developer-20'],
  'project-04': ['developer-01', 'developer-07', 'developer-09', 'developer-15'],
  'project-05': ['developer-03', 'developer-10', 'developer-14', 'developer-18'],
  'project-06': ['developer-06', 'developer-08', 'developer-12', 'developer-15'],
  'project-07': ['developer-04', 'developer-05', 'developer-09', 'developer-13'],
  'project-08': ['developer-07', 'developer-08', 'developer-14', 'developer-18'],
  'project-09': ['developer-02', 'developer-12', 'developer-16', 'developer-20'],
  'project-10': ['developer-05', 'developer-06', 'developer-13', 'developer-17'],
};

export const projectTechnologies = {
  'project-01': ['technology-01', 'technology-02', 'technology-03', 'technology-10'],
  'project-02': ['technology-01', 'technology-05', 'technology-06', 'technology-12'],
  'project-03': ['technology-01', 'technology-02', 'technology-11', 'technology-15'],
  'project-04': ['technology-01', 'technology-09', 'technology-10', 'technology-05'],
  'project-05': ['technology-04', 'technology-06', 'technology-12', 'technology-13'],
  'project-06': ['technology-02', 'technology-03', 'technology-06', 'technology-10'],
  'project-07': ['technology-08', 'technology-10', 'technology-14', 'technology-05'],
  'project-08': ['technology-01', 'technology-06', 'technology-12', 'technology-13'],
  'project-09': ['technology-02', 'technology-15', 'technology-04'],
  'project-10': ['technology-14', 'technology-08', 'technology-07', 'technology-10'],
};

export const projectSkills = {
  'project-01': ['skill-08', 'skill-09', 'skill-11'], 'project-02': ['skill-20', 'skill-27'],
  'project-03': ['skill-07', 'skill-13', 'skill-30'], 'project-04': ['skill-09', 'skill-14', 'skill-28'],
  'project-05': ['skill-19', 'skill-20', 'skill-21'], 'project-06': ['skill-08', 'skill-11', 'skill-28'],
  'project-07': ['skill-03', 'skill-17', 'skill-30'], 'project-08': ['skill-20', 'skill-21', 'skill-28'],
  'project-09': ['skill-22', 'skill-23', 'skill-24'], 'project-10': ['skill-03', 'skill-29', 'skill-30'],
};

export const projectCompanies = {
  'project-01': 'company-01', 'project-02': 'company-01', 'project-03': 'company-01',
  'project-04': 'company-02', 'project-05': 'company-02', 'project-07': 'company-02',
  'project-06': 'company-03', 'project-08': 'company-03', 'project-09': 'company-03',
  'project-10': 'company-01',
};

export const repositoryContributors = Object.fromEntries(
  Object.entries(projectDevelopers).map(([projectId, developerIds], index) => [
    `repository-${String(index + 1).padStart(2, '0')}`,
    developerIds,
  ]),
);

export const collaborations = [
  ['developer-01', 'developer-04'], ['developer-01', 'developer-09'],
  ['developer-02', 'developer-11'], ['developer-02', 'developer-16'],
  ['developer-03', 'developer-10'], ['developer-03', 'developer-14'],
  ['developer-04', 'developer-05'], ['developer-04', 'developer-13'],
  ['developer-05', 'developer-17'], ['developer-06', 'developer-12'],
  ['developer-06', 'developer-20'], ['developer-07', 'developer-08'],
  ['developer-07', 'developer-15'], ['developer-08', 'developer-18'],
  ['developer-09', 'developer-13'], ['developer-10', 'developer-18'],
  ['developer-11', 'developer-17'], ['developer-12', 'developer-16'],
  ['developer-13', 'developer-17'], ['developer-14', 'developer-18'],
  ['developer-15', 'developer-20'], ['developer-16', 'developer-19'],
];

export const mentorships = [
  ['developer-07', 'developer-01'], ['developer-01', 'developer-09'],
  ['developer-15', 'developer-12'], ['developer-02', 'developer-06'],
  ['developer-05', 'developer-04'], ['developer-05', 'developer-13'],
  ['developer-18', 'developer-14'], ['developer-08', 'developer-16'],
  ['developer-11', 'developer-19'], ['developer-17', 'developer-20'],
];
