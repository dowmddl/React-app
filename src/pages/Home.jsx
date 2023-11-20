import React, { useState } from 'react';
import styled from 'styled-components';
import fakeData from '../fakeData.json';

const StyledHeader = styled.header`
  background-color: white;
  background-image: url(./t1.png);
  padding: 10px;
  display: flex;
  width: 100%;
  height: 280px;
  justify-content: space-between; 
  align-items: center; 
`;
const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 750px;
`;

const StyledButton = styled.button`
  font-size: 16px;
  background-color: ${({ isSelected }) => (isSelected ? 'red' : 'black')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  margin: 10px;
`;

const StyledLetterContainer = styled.div`
   max-width: 1200px;
    min-width: 800px;
    margin: 100px auto;
    background-color: #ff00008f;
    font-size: 16px;
    padding: 50px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    border-radius: 10px;
`;

const StyledRecipientSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  max-width: 200px;
`;

const StyledSenderInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  max-width: 200px;
`;

const StyledMessageInput = styled.textarea`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  max-width: 800px;
  max-height: 300px;
`;

const StyledSendButton = styled.button`
  background-color: black;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  height: 50px;
  display: flex; 
  align-items: center;
  justify-content: center; 
`;

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledLetterList = styled.div`
  margin-top: 20px;
`;

const StyledLetter = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledLetterContent = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

function Home() {
  const initialButtons = ['Zeus', 'Oner', 'Faker', 'Gumayusi', 'Keria'];
  const [selectedButton, setSelectedButton] = useState(initialButtons[0]);
  const [recipient, setRecipient] = useState('');
  const [senderNickname, setSenderNickname] = useState('');
  const [message, setMessage] = useState('');
  const [letters, setLetters] = useState(fakeData);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setRecipient(buttonName);
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSenderChange = (event) => {
    setSenderNickname(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendLetter = () => {
    const newLetter = {
      createdAt: new Date().toISOString(),
      nickname: senderNickname,
      content: message,
      writedTo: recipient,
      avatar: 'URL_TO_YOUR_AVATAR_IMAGE', 
      id: (letters.length + 1).toString(),
    };

    setLetters([...letters, newLetter]);

    
    setRecipient('');
    setSenderNickname('');
    setMessage('');

  };

  const filteredLetters = letters.filter((letter) => letter.writedTo === recipient);
  return (
    <>
       <StyledHeader>
        <BtnContainer>
        {initialButtons.map((buttonName) => (
          <StyledButton
            key={buttonName}
            isSelected={selectedButton === buttonName}
            onClick={() => handleButtonClick(buttonName)}
          >
            {buttonName}
          </StyledButton>
        ))}
        </BtnContainer>
      </StyledHeader>
      <StyledLetterContainer>
        <StyledLabel htmlFor="recipient">To</StyledLabel>
        <StyledRecipientSelect id="recipient" value={recipient} onChange={handleRecipientChange}>
          <option value="">Select Recipient</option>
          {initialButtons.map((buttonName) => (
            <option key={buttonName} value={buttonName}>
              {buttonName}
            </option>
          ))}
        </StyledRecipientSelect>
        <StyledLabel htmlFor="sender">보내는 사람</StyledLabel>
        <StyledSenderInput
          id="sender"
          type="text"
          placeholder="(최대 20글자)"
          value={senderNickname}
          onChange={handleSenderChange}
          maxLength={20}
        />
        <StyledLabel htmlFor="message">보내는 내용:</StyledLabel>
        <StyledMessageInput
          id="message"
          placeholder="(최대 100글자)"
          value={message}
          onChange={handleMessageChange}
          maxLength={100}
        />
        <StyledSendButton onClick={handleSendLetter}>Send Letter</StyledSendButton>
      </StyledLetterContainer>
      <StyledLetterList>
        {filteredLetters.map((letter) => (
          <StyledLetter key={letter.id}>
            <StyledLetterContent>
              <StyledAvatar src={letter.avatar} alt="Avatar" />
              <div>
                <p>{`From: ${letter.nickname}`}</p>
                <p>{`To: ${letter.writedTo}`}</p>
                <p>{`Content: ${letter.content}`}</p>
              </div>
            </StyledLetterContent>
          </StyledLetter>
        ))}
      </StyledLetterList>
    </>
  );
}

export default Home;