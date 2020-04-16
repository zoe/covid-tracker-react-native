import renderer from 'react-test-renderer'
import React from 'react'
import { WelcomeScreen } from '../WelcomeScreen'
import { render, fireEvent } from 'react-native-testing-library'
import { Linking } from 'react-native'

describe('Welcome Screen', () => {
    it('should match snapshot', () => {
        const tree = renderer.create(
                <WelcomeScreen />
            ).toJSON()
        expect(tree).toMatchSnapshot()    
    })

    test('Visit NHS website link fires onPress event', () => {
        const visitNhsText = 'visit the NHS website'
        const onPressMock = jest.fn(() =>
          Linking.openURL('https://www.nhs.uk/conditions/coronavirus-covid-19/')
        )
        const { getByTestId } = render(
            <WelcomeScreen testID='nhsLink' onPress={onPressMock} />
        )
        fireEvent(getByTestId('nhsLink'), 'onPress', visitNhsText)
        expect(onPressMock).toHaveBeenCalled()
        expect(onPressMock).toHaveBeenCalledWith(visitNhsText)
    })

    test('Create account fires onPress event', () => {
        const createAccountText = 'Create account'
        const onPressMock = jest.fn()
        const { getByTestId } = render(<WelcomeScreen testID='createAccount' onPress={onPressMock} />)      
        fireEvent(getByTestId('createAccount'), 'onPress', createAccountText)
        expect(onPressMock).toHaveBeenCalled()
        expect(onPressMock).toHaveBeenCalledWith(createAccountText)
    })

    test('For more info fires onPress event', () => {
        const moreInfoText = 'For more info visit our website'
        const onPressMock = jest.fn()
        const { getByTestId } = render(<WelcomeScreen testID='moreInfo' onPress={onPressMock} />)
        fireEvent(getByTestId('moreInfo'), 'onPress', moreInfoText)
        expect(onPressMock).toHaveBeenCalled()
        expect(onPressMock).toHaveBeenCalledWith(moreInfoText)
    })

})
