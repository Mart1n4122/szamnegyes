namespace MauiApp1;

public partial class MainPage : ContentPage
{
    Label[,] cells = new Label[3, 3];

    public MainPage()
    {
        InitializeComponent();
        CreateBoard();
    }

    void CreateBoard()
    {
        Board.Children.Clear();

        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                var label = new Label
                {
                    Text = "0",
                    WidthRequest = 60,
                    HeightRequest = 60,
                    FontSize = 20,
                    HorizontalTextAlignment = TextAlignment.Center,
                    VerticalTextAlignment = TextAlignment.Center,
                    BackgroundColor = Colors.White,
                    TextColor = Colors.Black
                };

                cells[i, j] = label;
                Board.Add(label, j, i);
            }
        }
    }

    void Increment(params (int r, int c)[] positions)
    {
        foreach (var (r, c) in positions)
        {
            int value = int.Parse(cells[r, c].Text);
            cells[r, c].Text = (value + 1).ToString();
        }
    }

    void OnA(object sender, EventArgs e) =>
        Increment((0, 0), (0, 1), (1, 0), (1, 1));

    void OnB(object sender, EventArgs e) =>
        Increment((0, 1), (0, 2), (1, 1), (1, 2));

    void OnC(object sender, EventArgs e) =>
        Increment((1, 0), (1, 1), (2, 0), (2, 1));

    void OnD(object sender, EventArgs e) =>
        Increment((1, 1), (1, 2), (2, 1), (2, 2));

    void OnReset(object sender, EventArgs e)
    {
        foreach (var cell in cells)
            cell.Text = "0";

        ResultLabel.Text = "Eredmény: -";
        ResultLabel.TextColor = Colors.Black;
    }

    void OnCheck(object sender, EventArgs e)
    {
        int[,] t = new int[3, 3];

        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                t[i, j] = int.Parse(cells[i, j].Text);

        int a = t[0, 0];
        int b = t[0, 2];
        int c = t[2, 0];
        int d = t[2, 2];

        bool valid =
            t[0, 1] == a + b &&
            t[1, 0] == a + c &&
            t[1, 2] == b + d &&
            t[2, 1] == c + d &&
            t[1, 1] == a + b + c + d;

        if (!valid)
        {
            ResultLabel.Text = "Eredmény: [-1]";
            ResultLabel.TextColor = Colors.Red;
        }
        else
        {
            ResultLabel.Text = $"Eredmény: [{a}, {b}, {c}, {d}]";
            ResultLabel.TextColor = Colors.Green;
        }
    }
}
