import logo from './assets/ChatGPT_Logo.png';
import { useState } from 'react';
import { Modal, Typography, Box, TextField, LinearProgress } from '@mui/material';
import axios from 'axios';
import GPTResponse from './components/GPTResponse';


function App() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setResponse("");
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);
    const res = await axios.post('http://localhost:3000/chat', {prompt});
    setResponse(res);
    setLoading(false);
    console.log(res);
  }

  return (
    <div className="app">
      <img src={logo} />
      <button onClick={handleOpen} className='btn'>Ask me anything!</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='chatgpt-modal'
      >
      <Box className = "container">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Drop your Questions
        </Typography>
        <form className= "chatform" onSubmit={(e) => {handleSubmit(e)}} >
          <TextField value = {prompt} onChange={(e) => setPrompt(e.target.value)} id="outlined-basic" label="Start your Chat!" variant="outlined" sx = {{margin: "15px 0", width: "100%"}}/>
          <button type='submit' className='btn'>Submit</button>
        </form>
        {loading && <LinearProgress sx={{margin: "20px 0"}}/>}
        {response && <GPTResponse response={response}/>}
      </Box>
      </Modal>
    </div>
  );
}

// Export the App component
export default App;
