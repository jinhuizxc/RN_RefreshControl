/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/**
 * RefreshControl
 * 支持我们
 * 这一组件可以用在ScrollView或ListView内部，为其添加下拉刷新的功能。
 * 当ScrollView处于竖直方向的起点位置（scrollY: 0），此时下拉会触发一个onRefresh事件。
 *
 * 属性
 * onRefresh function
 * 在视图开始刷新时调用。
 * refreshing bool
 * 视图是否应该在刷新时显示指示器。
 * android colors [ColorPropType]
 * 指定至少一种颜色用来绘制刷新指示器。
 * android enabled bool
 * 指定是否要开启刷新指示器。
 * android progressBackgroundColor ColorPropType
 * 指定刷新指示器的背景色。
 * android size RefreshLayoutConsts.SIZE.DEFAULT
 * 指定刷新指示器的大小，具体数值可参阅RefreshControl.SIZE.
 * android progressViewOffset React.PropTypes.number
 * 指定刷新指示器的垂直起始位置(top offset)。
 * ios tintColor ColorPropType
 * 指定刷新指示器的颜色。
 * ios title string
 * 指定刷新指示器下显示的文字。
 */
import React from 'react';
import {
    AppRegistry,
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5,
    },
    text: {
        alignSelf: 'center',
        color: '#fff',
    },
    scrollview: {
        flex: 1,
    },
});

const Row = React.createClass({
    _onClick: function () {
        this.props.onClick(this.props.data);
    },
    render: function () {
        return (
            <TouchableWithoutFeedback onPress={this._onClick}>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    },
});

const RefreshControlExample = React.createClass({
    statics: {
        title: '<RefreshControl>',
        description: 'Adds pull-to-refresh support to a scrollview.'
    },

    // 初始状态
    getInitialState() {
        return {
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(20)).map(
                (val, i) => ({text: '初始数据 ' + i, clicks: 0})),
        };
    },
    // 点击事件
    _onClick(row) {
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        });
    },

    render() {
        const rows = this.state.rowData.map((row, ii) => {
            return <Row key={ii} data={row} onClick={this._onClick}/>;
        });
        return (
            <ScrollView
                style={styles.scrollview}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        // 指定刷新指示器的颜色
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />
                }>
                {rows}
            </ScrollView>
        );
    },

    // 加载数据
    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // prepend 10 items
            const rowData = Array.from(new Array(10))
                .map((val, i) => ({
                    text: '加载数据 ' + (+this.state.loaded + i),
                    clicks: 0,
                }))
                .concat(this.state.rowData);

            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,
                rowData: rowData,
            });
        }, 3000);
    },
});

AppRegistry.registerComponent('RN_RefreshControl', () => RefreshControlExample);
