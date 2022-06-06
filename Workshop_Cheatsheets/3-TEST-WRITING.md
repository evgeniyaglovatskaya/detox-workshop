# Test writing

Many great examples can be found [here](https://github.com/wix/Detox/tree/master/detox/test/e2e).

## Documentation

- [Matchers](https://wix.github.io/Detox/docs/api/matchers)
- [Actions](https://wix.github.io/Detox/docs/api/actions-on-element)
- [Expectations](https://wix.github.io/Detox/docs/api/expect)

## Best practices

- Add testID

It is always the best idea to match your element by something unique. We recommend using testID prop for this purpose if possible. 

```jsx
<View>
  <TouchableOpacity testID='MyUniqueId123'>
    <Text>Some text</Text>
  </TouchableOpacity>
</View>
```

- Pass testID to native components

Custom React Native components are not aware of testIDs you pass to them. You need to pass the testID props down and down until it reaches a native component (e.g. <View>) which implements testID rendering as native accessibility identifiers in iOS and Android.

```jsx
<TrendingMovies testID='OtherMovies'/>
```
```jsx
<View testID={props.testID}>
    <Text>Some button</Text>
</View>
  ```

- Generate testID for repetitive components

```jsx
<View testID={props.testID + '.view'}>
    <Text>Some button</Text>
</View>
  ```

- Combine matchers for repetitive components in case you can't generate a testID

```js
element(by.id('child').withAncestor(by.id('parent')));
```
```js
element(by.id('uniqueId').and(by.text('some text')));
```
```js
element(by.id('Product')).atIndex(2);
```

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
