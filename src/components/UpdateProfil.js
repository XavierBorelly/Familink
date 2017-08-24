import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';

const $inputBorderColor = '#E0E4CC';
const $lightgrayColor = '#EEEEEE';
const $whiteColor = '#FFFFFF';
const $labelColor = '#FF0000';

let errors = [];

const styles = StyleSheet.create({
  content: {
    backgroundColor: $lightgrayColor,
    flex: 0.8,
    width: '80%',
  },
  cell: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  textinput: {
    paddingLeft: 10,
    borderColor: $inputBorderColor,
    flex: 1,
    backgroundColor: $whiteColor,
    width: '80%',
  },
  label: {
    color: $labelColor,
    flex: 1,
    width: '80%',
  },
});

export default class ProfilePicker extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { canUpdate: false };
  }

  /* eslint-disable no-lone-blocks */
  ValidateProfile()
  {
    return (
      <View style={styles.content}>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Nom'}
          </Text>
          <TextInput
            style={styles.textinput}
            defaultValue={'Durand'}
            editable
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Prénom'}
          </Text>
          <TextInput
            style={styles.textinput}
            defaultValue={'Kévin'}
            editable
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Téléphone'}
          </Text>
          <TextInput
            style={styles.textinput}
            defaultValue={'0655555555'}
            editable
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Mail'}
          </Text>
          <TextInput
            style={styles.textinput}
            defaultValue={'kevin.durand@mail.com'}
            editable
          />
        </View>

        <View style={styles.cell}>
          <Button
            onPress={() =>
            {
              errors = [];
              let thereIsErrors = false;
              for (let i = 0; i < errors.length; i += 1)
              {
                if (errors[i] !== '')
                {
                  showInformativePopin(errorPopinTitle, errors[i]);
                  thereIsErrors = true;
                  break;
                }
              }
              if (!thereIsErrors)
              {
                // afficher les champs modifiables
                this.setState({ canUpdate: false });
              }
            }
            }
            title="Valider"
            color="#D35400"
            accessibilityLabel="Valider"
          />
        </View>
      </View>
    );
  }

  EditeProfile()
  {
    return (
      <View style={styles.content}>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Nom'}
          </Text>
          <TextInput
            style={styles.textinput}
            defaultValue={'Durand'}
            editable={false}
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Prénom'}
          </Text>
          <TextInput
            style={styles.textinput}
            defaultValue={'Kévin'}
            editable={false}
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Téléphone'}
          </Text>
          <TextInput
            style={styles.textinput}
            defaultValue={'0655555555'}
            editable={false}
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Mail'}
          </Text>
          <TextInput
            style={styles.textinput}
            defaultValue={'kevin.durand@mail.com'}
            editable={false}
          />
        </View>

        <View style={styles.cell}>
          <Button
            onPress={() =>
            {
              errors = [];
              let thereIsErrors = false;
              for (let i = 0; i < errors.length; i += 1)
              {
                if (errors[i] !== '')
                {
                  showInformativePopin(errorPopinTitle, errors[i]);
                  thereIsErrors = true;
                  break;
                }
              }
              if (!thereIsErrors)
              {
                // afficher les champs modifiables
                this.setState({ canUpdate: true });
              }
            }
            }
            title="Modifier"
            color="#D35400"
            accessibilityLabel="Modifier"
          />
        </View>
      </View>
    );
  }

  render()
  {
    const editRender = this.EditeProfile();
    const validRender = this.ValidateProfile();
    if (this.state.canUpdate === false)
    {
      return (
        <View>
          { editRender }
        </View>
      );
    }
    return (
      <View>
        { validRender }
      </View>
    );
  }
}
