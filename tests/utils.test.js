const { validateEmail, validatePassword } = require("../utils/dataValidation")
//validating data
describe('validateEmail function', () => {
    test('email has recipient name', () => {
        expect(validateEmail("test@gmail.com")).toBe(true)
        expect(validateEmail("@gmail.com")).toBe(false)
    })
    test('email has no missing "@" symbol or multiple "@" symbols', () => {
        expect(validateEmail("test@gmail.com")).toBe(true)
        expect(validateEmail("testgmail.com")).toBe(false)
        expect(validateEmail("test@g@mail.com")).toBe(false)
    })
    test('no spaces before or after the email address', () => {
        expect(validateEmail("test@gmail.com")).toBe(true)
        expect(validateEmail(" testgmail.com")).toBe(false)
        expect(validateEmail("test@g@mail.com ")).toBe(false)
    })
    test('entering the email address in all uppercase or lowercase', () => {
        expect(validateEmail("test@gmail.com")).toBe(true)
        expect(validateEmail("TEST@GMAIL.COM")).toBe(true)
    })
    test(`can not have two dots together on the right side of @ or straigth after it`, () => {
        expect(validateEmail("test@gmail..com")).toBe(false)
        expect(validateEmail("te....st@gmail.com")).toBe(true)
        expect(validateEmail("test@.gmail.com")).toBe(false)
    })
    test(`may include special characters such as (-),(.),(+) and not other special characters (!), (#)`, () => {
        expect(validateEmail("te-st@gmail.com")).toBe(true)
        expect(validateEmail("te.st@gmail.com")).toBe(true)
        expect(validateEmail("te+st@gmail.com")).toBe(true)
        expect(validateEmail("te!st@gmail.com")).toBe(false)
        expect(validateEmail("te#st@gmail.com")).toBe(false)
    })
    test(`has top level domain`, () => {
        expect(validateEmail("test@gmail.com")).toBe(true)
        expect(validateEmail("test@domainsample")).toBe(false)
    })
})

describe('validatePassword function', () => {
    test('password requires at least one digit (0-9)', () => {
        expect(validatePassword("Testing193!")).toBe(true)
        expect(validateEmail("Testingdfyh!")).toBe(false)
    })
    test('password requires at least one lowercase and uppercase letter', () => {
        expect(validatePassword("Testing193!")).toBe(true)
        expect(validateEmail("testing193!")).toBe(false)
        expect(validateEmail("TESTING193!")).toBe(false)
    })
    test('password requires a minimum of 8 characters in total', () => {
        expect(validatePassword("Te34567!")).toBe(true)
        expect(validateEmail("Te3456!")).toBe(false)
    })
    test('password requires at least one special character', () => {
        expect(validatePassword("Testing193!")).toBe(true)
        expect(validateEmail("Testing193")).toBe(false)
    })
    test('password requires no line breacks', () => {
        expect(validatePassword("Testing193!")).toBe(true)
        expect(validateEmail(`Testi
        ng193`)).toBe(false)
    })
    test('password can have spaces exept at the start and end', () => {
        expect(validatePassword("Testing 193!")).toBe(true)
        expect(validateEmail(` Testing193 `)).toBe(false)
    })
})