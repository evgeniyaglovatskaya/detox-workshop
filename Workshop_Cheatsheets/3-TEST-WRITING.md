# Test writing

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

## Failed test

- Change log level to see more information

```sh
detox test -c <configuration> -l [fatal/error/warn/info/verbose/trace]
```

- Screenshot app before and after test (learn more about [artifacts here](https://wix.github.io/Detox/docs/api/artifacts))

```sh
detox test -c <configuration> --take-screenshots [manual/failing/all/none]
```

- Record video of your test (learn more about [artifacts here](https://wix.github.io/Detox/docs/api/artifacts))

```sh
detox test -c <configuration> --record-videos [failing/all/none]
```

- Use node debugger

```sh
detox test -c <configuration> --inspect-brk
```

## Flakiness

- Start fresh

Make sure you clean your app state before every test that you do. To make sure you're good - try changing order of your tests and see if they still pass.

- Match by something unique

Matching by testID prop is the recommended way. In case your testID is not unique - try using withAncestor/Descendant or and matchers.

- Use correct test structure

Make sure you have setup, execution, validation and cleanup phases in your test. In best case - every test should end with some expectation. 

- Be careful with changing state 

Keep in mind the data you use while testing and how you modify it.

- Always write tests as they would run in parallel, not sequentially

Make sure test2 doesn't start from the point where test1 ends. And test2 doesn't rely on some data created by test1.

- Retry

In case you can't find a better way you can also make Detox rerun your failing tests up to X amount of times until it passes.

```sh
detox test -c <configuration> --retries [X]
```
