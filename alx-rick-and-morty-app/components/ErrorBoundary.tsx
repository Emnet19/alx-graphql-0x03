import React from "react";
import * as Sentry from '@sentry/react'
interface State{
    hasError:boolean;

}

interface ErrorBoundaryProps{
    children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps,State>{
    constructor(props:ErrorBoundaryProps){
        super(props);
        this.state={hasError:false};
    }
    static getDerivedStateFromError(error:Error):
    State{
        return{hasError:true}
    }

    componentDidCatch(error:Error,errorInfo:React.ErrorInfo){
            console.error("Error caught:", error, errorInfo);
    Sentry.captureException(error); // ✅ Send error details to Sentry
    }
    render(){
        if(this.state.hasError){
            return(
                <div>
                    <h2>Oops,there is an error!</h2>
                    <button onClick={()=>this.setState({hasError:false})}>Try again?</button>

                </div>
            )
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
