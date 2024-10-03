interface DatePickerProps {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
    handleReset: () => void
}