function reverseString (string: string) : string {
    
    return string.split('').reverse().join('')
}

console.log(reverseString("abcd"))
