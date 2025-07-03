



import { IoIosHelpCircleOutline } from "react-icons/io";
import { CiCircleChevDown } from "react-icons/ci";
import { CiCircleChevUp } from "react-icons/ci";
import {AboutMainContainer ,HelpContentContainer,HelpViewContainer
    ,HelpViewInnerContainer,
    InstructionCard,
    ListHeading,
    UnorderedList
} from "../ui/AboutUI/aboutui"
interface AboutType {
    isOpen:boolean,
    setToggleHelp: (isOpen: boolean)=> void
}

export  const About = ({isOpen, setToggleHelp}: AboutType) => {
    return ( 
 <AboutMainContainer>
    <HelpViewContainer>
         <HelpViewInnerContainer>
                <IoIosHelpCircleOutline size = {20}/>
                How to use ?
        </HelpViewInnerContainer>
            {!isOpen ? <CiCircleChevDown className = "cursor-pointer" size = {30} onClick={()=>{
                setToggleHelp(!isOpen);
            }}/> : <CiCircleChevUp
                    size = {30}
                    className = "cursor-pointer"
                        onClick={
                            ()=>{
                                setToggleHelp(!isOpen)
                            }
                        }    
                />
            }
    </HelpViewContainer>
   {isOpen && (
    <>
        

        <HelpContentContainer>
       
            
            <InstructionCard>
            <ListHeading>Add Nodes</ListHeading>
            <UnorderedList>
                <li>Click a node type button</li>
                <li>Drag nodes to reposition</li>
                <li>Click to select a node</li>
            </UnorderedList>
            </InstructionCard>

            
            <InstructionCard>
            <ListHeading>Connect Nodes</ListHeading>
            <UnorderedList>
                <li>Drag from output to input handle</li>
                <li>Self-connections are blocked</li>
                <li>Connections show direction</li>
            </UnorderedList>
            </InstructionCard>

       
            <InstructionCard>
            <ListHeading>Delete Items</ListHeading>
            <UnorderedList>
                <li>Select and press Delete or Backspace</li>
                <li>Use trash icon on selected node</li>
                <li>Click Clear All to reset the canvas</li>
            </UnorderedList>
            </InstructionCard>

            
            <InstructionCard>
            <ListHeading >Validation Rules</ListHeading>
            <UnorderedList>
                <li>At least 2 nodes required</li>
                <li>All nodes must be connected</li>
                <li>No cycles allowed</li>
            </UnorderedList>
            </InstructionCard>

        </HelpContentContainer>
    </>
)}
</AboutMainContainer>

    )
}