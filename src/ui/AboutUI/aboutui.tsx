import {  type ReactNode } from "react"


interface UiProps {
    children: ReactNode
}

export const AboutMainContainer = ({children}: UiProps) => {
    return (
            <div className="bg-white border-1 border-slate-200 rounded-lg shadow w-full">

                    {children}
            </div>
    )
}

export const HelpViewContainer = ({children}: UiProps) => {
        return (
            <div className = "flex items-center justify-between w-full p-2">
                    {children}
            </div>
        )
}

export const HelpViewInnerContainer = ({children}: UiProps) => {
        return (
            <div className = "flex items-center gap-1 justify-evenly font-medium">
                    {children}
             </div>   
        )
}

export const HelpContentContainer = ({children}: UiProps) => {
    return (
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-700 p-5 items-center">
                {children}
        </div>
    )
}

export const InstructionCard = ({children}: UiProps) => {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                {children}
        </div>
    )
}

export const ListHeading = ({children}: UiProps) => {
        return (
            <h4  className="font-medium text-gray-900 mb-2">

                {children}
            </h4>
        )
}
export const UnorderedList = ({children}: UiProps) => {
    return (
        <ul className="list-disc list-inside space-y-1">
                {children}
        </ul>
    )
}