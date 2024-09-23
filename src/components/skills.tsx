import '../assets/css/skills.css';

function Skills() {
  const skills = [
    {
      title: "Full Stack Development",
      description: "Building scalable web applications from front to back using modern tech stacks."
    },
    {
      title: "Artificial Intelligence",
      description: "Expertise in AI and Machine Learning to develop intelligent systems and automation solutions."
    },
    {
      title: "Mobile Development",
      description: "Building cross-platform mobile apps using React Native and Flutter."
    },
    {
      title: "Django Development",
      description: "Building web applications using Django, a high-level Python web framework."
    },
    {
      title: "Laravel Development",
      description: "Building web applications using Laravel, a PHP framework."
    },
    {
      title: "React Development",
      description: "Building interactive user interfaces using React, a JavaScript library."
    }
  ];

  return (
    <div className="skillsPage">
      <h1 className="skillsTitle">My Skills</h1>
      <div className="skillsList">
        {skills.map((skill, index) => (
          <div className="skillCard" key={index}>
            <h2 className="skillTitle">{skill.title}</h2>
            <p className="skillDescription">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills