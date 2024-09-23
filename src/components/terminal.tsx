import { useRef, useState } from "react";
import '../assets/css/terminal.css';

function Terminal({open}: {open: (index: number) => void}) {
  const [command, setCommand] = useState<string>('');
  const terminal = useRef<HTMLDivElement>(null);
  const history = useRef<HTMLDivElement>(null);
  const commandHistory = useRef<string[]>([]);
  const commandIndex = useRef<number>(0);

  const commands: { [key: string]: () => string } = {
    date: () => {
      return new Date().toString();
    },
    bhargav: () => {
      return 'Hi, I am <a target="_blank" href="https://bhargavratnala.github.io">Bhargav Ratnala</a>. I am a Full Stack Developer.';
    },
    mypc: () =>{
      open(0);
      return '';
    },
    projects: () => {
      open(2);
      return '';
    },
    skills: () => {
      open(3);
      return '';
    },
    education: () => {
      open(4);
      return '';
    },
    github: () => {
      return '<a target="_blank" href="https://github.com/bhargavratnala">' + 'Visit my GitHub profile' + '</a>';
    },
    linkedin: () => {
      return '<a target="_blank" href="https://www.linkedin.com/in/bhargavratnala/">' + 'Visit my LinkedIn profile' + '</a>';
    },
    portfolio: () => {
      return '<a target="_blank" href="https://bhargavratnala.github.io/">' + 'Visit my portfolio' + '</a>';
    },
    clr: () => {
      if (history.current) {
        history.current.innerHTML = '';
      }
      return '';
    },
    help: () => {
      return `<span>date - show current date and time</span><br />
              <span>bhargav - about me</span><br />
              <span>mypc - open My PC</span><br />
              <span>projects - open Projects</span><br />
              <span>skills - open Skills</span><br />
              <span>education - open Education</span><br />
              <span>github - visit my GitHub profile</span><br />
              <span>linkedin - visit my LinkedIn profile</span><br />
              <span>portfolio - visit my portfolio</span><br />
              <span>clr - clear the terminal</span><br />
              <span>help - show this help message</span>`;
    },
  };

  function handleRunCommand(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (command.trim() === '') {
        runCommand("");
        return;
      }
      runCommand(command);
      commandHistory.current.push(command);
      commandIndex.current = commandHistory.current.length;
      if (terminal.current && terminal.current.parentElement) {
        terminal.current.parentElement.scrollTop = terminal.current.parentElement.scrollHeight;
      }
      setCommand('');
      return;
    }
    if (event.key === 'ArrowUp') {
      commandIndex.current = Math.max(0, commandIndex.current - 1);
      setCommand(commandHistory.current[commandIndex.current]);
      return;
    }
    if (event.key === 'ArrowDown') {
      commandIndex.current = Math.min(commandHistory.current.length, commandIndex.current + 1);
      setCommand(commandHistory.current[commandIndex.current] || '');
      return;
    }
  }

  function runCommand(command: string) {
    let output;
    if(command === ''){
      output = '';
    }
    else if (commands[command]) {
      output = commands[command]();
    }
    else
    output = `${command}: command not found`;
    if (history.current && command !== 'clr') {
      const div = document.createElement('div');
      div.className = 'inputCommand';
      div.innerHTML = `bhargav@root $ `;
      const span = document.createElement('span');
      span.className = 'command';
      span.innerHTML = command;
      div.appendChild(span);
      div.innerHTML += '<br />';
      const outputDiv = document.createElement('div');
      outputDiv.className = 'output';
      outputDiv.innerHTML = output;
      div.appendChild(outputDiv);
      history.current.appendChild(div);
    }
  }

  function handleCommand(event: React.ChangeEvent<HTMLInputElement>) {
    setCommand(event.target.value);
  }

  return (
    <div className="terminal" ref={terminal}>
      <div className="history" ref={history}>
      </div>
      <div className="inputCommand">
        bhargav@root $
        <input type="text" className="command" value={command} onKeyDown={handleRunCommand} onChange={handleCommand} />
      </div>
    </div>
  );
}

export default Terminal;