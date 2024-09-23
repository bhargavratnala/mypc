import '../assets/css/mypc.css';
import Image from '../assets/icons/icon_rb.png';

function MyPC() {
  return (
    <div className="mypc">
      <div className="details">
        <img src={Image} alt="My PC" className='mypcImage' />
        <div className="detailsText">
          <h1 className='mypcTitle'>Bhargav Ratnala</h1>
          <span className="position">Full Stack Developer</span>
          <p className="description">
            Passionate about developing scalable applications using modern technologies.
          </p>
        </div>
      </div>
      <div className='pcDetails'>
        <h3>PC Details</h3>
        <ul>
          <li>OS: B-OS</li>
          <li>Version: 1.0.0</li>
          <li>Processor: Intel i7</li>
          <li>RAM: 16 GB</li>
          <li>Graphics: NVIDIA GTX 1650</li>
          <li>Storage: 1TB SSD</li>
          <li>Developed by Bhargav Ratnala</li>
        </ul>
      </div>
    </div>
  );
}

export default MyPC;