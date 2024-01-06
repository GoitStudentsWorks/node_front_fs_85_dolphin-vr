import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { updateWaterNorma } from "../../redux/user/userOperations";
import { Container, Title, Backdrop,Formula,Gender,Description,Start,GenderFormula,TitleLabel,RadioBtn,GenderBtn,GenderInput,GenderLabel,Forma,Labels,DataLabel,ModalInput,ResultCont,Littres,TextResult,WriteInput,Btn,CloseBtn } from "./CalcModal.styled";
import sprite from "../../images/sprite.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CalcModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [result, setResult] = useState(2);
  const [values, setValues] = useState({
    gender: "girl",
    weight: "",
    time: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [rate, setRate] = useState("");
  

  

  const handleSubmit = (e) => {
    e.preventDefault();
  
   
    if (!rate ) {
      toast.error('Please fill in all fields');
      return;
    }
  
    if (rate) {
      dispatch(updateWaterNorma(rate * 1000));
    }
  
    onClose(Modal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (value.trim() === "") {
      
      setValues({ ...values, [name]: value });
      return;
    }
  
    if (isNaN(parseFloat(value))) {
      toast.error('Please enter a valid number');
      return;
    }
  
    if (name === 'gender' && !value) {
      toast.error('Please select a gender');
      return;
    }
  
    if (name === 'weight' && parseFloat(value) > 300) {
      toast.error('Please enter a weight less than or equal to 300');
      return;
    }
  
    if (name === 'time' && parseFloat(value) > 24) {
      toast.error('Please enter a time less than or equal to 24');
      return;
    }
  
    setValues({ ...values, [name]: value });
  };

  const handleRate = (e) => {
    const value = e.target.value;
  
  
    if (
      
      
      value.includes('-')
    ) {
      toast.error('Please enter a valid non-negative value for water rate');
      return;
    }
  
    setRate(value);
  };
  

  const handleBlur = () => {
  calculate(values.gender, values.weight, values.time);
  updateResult(rate);
};


  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const calculate = (gender, weight = 0, time = 0) => {
    let calculatedResult = 0;
    switch (gender) {
      case "girl":
        if (weight >= 0 && time >= 0) {
          calculatedResult = weight * 0.03 + time * 0.4;
        }
        break;
      case "man":
        if (weight >= 0 && time >= 0) {
          calculatedResult = weight * 0.04 + time * 0.6;
        }
        break;
      default:
        break;
    }
    setResult(calculatedResult.toFixed(1));
  };

  return (
    <Modal isOpen={true} onRequestClose={handleClose} contentLabel="CalcModal">
      <Backdrop>
        <Container>
          <Title>My Daily Norma</Title>
          <CloseBtn type="button" onClick={handleClose}>
          <svg>
           <use href={sprite + "#modalclose"}></use>
          </svg>
          </CloseBtn>

          <GenderFormula>
            <li>
              <Gender>
              For girl: 
              <Formula>V=(M*0.03)+(T*0.4)</Formula>
              </Gender>
            </li>
            <li>
              <Gender>
              For man: 
              <Formula>V=(M*0.04)+(T*0.6)</Formula>
              </Gender>
            </li>
          </GenderFormula>

          <Description>
            <Start>*</Start>V is the volume of the water norm in liters per day, M
            is your body weight, T is the time of active sports, or another type
            of activity commensurate in terms of loads (in the absence of these,
            you must set 0)
          </Description>

          <TitleLabel>Calculate Your Rate:</TitleLabel>
          <RadioBtn>
        <GenderBtn>
          <GenderInput
            type="radio"
            value="girl"
            name="gender"
            
          />
          <GenderLabel htmlFor="Woman">For girl</GenderLabel>
        </GenderBtn>
        <GenderBtn>
          <GenderInput
            type="radio"
            value="man"
            name="gender"
            
          />
          <GenderLabel htmlFor="Man">For man</GenderLabel>
        </GenderBtn>
      </RadioBtn>

          <Forma onSubmit={handleSubmit}>
            <Labels>
              <DataLabel>Your weight in kilograms:</DataLabel>
              <ModalInput
                onBlur={handleBlur}
                type="text"
                name="weight"
                value={values.weight}
                onChange={handleInputChange}
              />
            </Labels>
            <Labels>
              <DataLabel>
                The time of active participation in sports or other activities
                with a high physical load:
              </DataLabel>
              <ModalInput
                onBlur={handleBlur}
                type="text"
                name="time"
                value={values.time}
                onChange={handleInputChange}
              />
            </Labels>
            <Labels>
              <ResultCont>
                <TextResult>The required amount of water in liters per day:</TextResult>
              
              <Littres>{result}L</Littres>
              </ResultCont>
            </Labels>
            <Labels>
              <WriteInput>Write down how much water you will drink:</WriteInput>
              <ModalInput
                type="text"
                id="water"
                name="rate"
                onChange={handleRate}
                onBlur={handleBlur}
                value={rate}
                
              />
            </Labels>
            <Btn type="submit">Save</Btn>
          </Forma>
        </Container>
      </Backdrop>
      <ToastContainer />
    </Modal>
  );
};

export default CalcModal;
