import {v4 as uuidv4} from  'uuid'
import { createContext, useState } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {

    const [feedback, setFeedback] = useState ([
        {
            id: 1,
            text: 'This is feedback item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This is feedback item 2',
            rating: 7
        },
        {
            id: 3,
            text: 'This is feedback item 3',
            rating: 9
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    // add feedback
    const addFeedback = (newfeedback) => {
        newfeedback.id = uuidv4()
        setFeedback([newfeedback, ...feedback])
    }

    // delete feedback
    const deleteFeedback = (id) => {
        if(window.confirm("Are you sure u want to delete?")) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // Update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? { ...item, ...updItem} : item))
        )
    }

    //Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    return(
        <FeedbackContext.Provider value={{
            feedback,       // ( not a function )
            feedbackEdit,   // holds the item and boolean value ( not a function )
            deleteFeedback, // function
            addFeedback,    // function
            editFeedback,   // function which edits the feedback
            updateFeedback  // function
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext