import '../assets/css/mypc.css';
import Image from '../assets/icons/icon_rb.png';

function MyPC() {
  return (
    <div className="mypc">
      <div className="details">
        <img src={Image} alt="My PC" className='mypcImage' />
        <div className="detailsText">
          <h1 className='mypcTitle'>Bhargav Ratnala</h1>
          <span>Full Stack Developer</span>
        </div>
      </div>
      <div className='pcDetails'>
        <h3>OS: B-OS</h3>
        <span>Version: 1.0.0</span><br />
        <span>Developed by Bhargav Ratnala</span>
        
      </div>
    </div>
  )
}

export default MyPC;