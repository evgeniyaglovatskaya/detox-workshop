# Test writing

Here we learn how to use Detox matchers, actions and expectations to write our tests.

Many great examples can be found [here](https://github.com/wix/Detox/tree/master/detox/test/e2e).

## Matchers

[See documentation here.](https://wix.github.io/Detox/docs/api/matchers)

## Adding testID

It is always the best idea to match your element by something unique. We recommend using testID prop for this purpose if possible. 

Note: not all React Native components support testID prop. 

```jsx
<View>
  <TouchableOpacity testID='MyUniqueId123'>
    <Text>Some button</Text>
  </TouchableOpacity>
</View>
```

## Actions

[See documentation here.](https://wix.github.io/Detox/docs/api/actions-on-element)

## Expectations

[See documentation here.](https://wix.github.io/Detox/docs/api/expect)
