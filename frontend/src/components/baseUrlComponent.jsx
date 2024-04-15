import { useState, useContext } from "react"
import { AppContext } from '../App'
import secureLocalStorage from "react-secure-storage";

const BaseUrlComponent = () => {
    const context = useContext(AppContext);

    const [baseUrl, setBaseUrl] = useState('')

    const onChangeUrl = (event) => setBaseUrl(event.target.value)

    const onSubmitUrl = () => {
        setBaseUrl(baseUrl)
        context.setValue(baseUrl)
        secureLocalStorage.setItem('baseUrl', baseUrl,{ expires: 14400000})
    }

    return <div>
        <p>Current Base API Url - {context.value}</p>
        <input value={baseUrl} onChange={onChangeUrl} placeholder="Enter Base Url" />
        <button onClick={onSubmitUrl}>Set Base Url</button>
    </div>
}

export default BaseUrlComponent