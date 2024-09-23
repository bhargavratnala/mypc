import "../assets/css/education.css";

function Education() {
  const educationData = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "GMR Institute of Technology",
      dates: "2021 - Present",
      description: "Specialized in software development, algorithms, and machine learning."
    },
    {
      degree: "Senior Secondary Education",
      institution: "Jawahar Navodaya Vidyalaya",
      dates: "2019 - 2021",
      description: "Completed my senior secondary education with a focus on Mathematics and Physics."
    },
    {
      degree: "Primary and Secondary Education",
      institution: "Jawahar Navodaya Vidyalaya",
      dates: "2014 - 2019",
      description: "Starter my education journey with the basics of all subjects and Physical Education."
    }
  ];

  return (
    <div className="educationPage">
      <h1 className="educationTitle">My Education</h1>
      <div className="educationList">
        {educationData.map((education, index) => (
          <div className="educationCard" key={index}>
            <h2 className="degreeTitle">{education.degree}</h2>
            <h3 className="institutionName">{education.institution}</h3>
            <p className="dates">{education.dates}</p>
            <p className="description">{education.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Education